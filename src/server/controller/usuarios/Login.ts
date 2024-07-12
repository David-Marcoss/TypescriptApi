import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import jwt from "jsonwebtoken";

import { validation } from "../../shared/middleware";
import { verifyPasswordHash } from "../../shared/service";
import { IUsuarios } from "../../database/models";
import { UsuariosProvider } from "../../database/providers";

// Omit serve para omitir uma propriedade
interface IBodyProps extends Omit<IUsuarios, "nome" | "id"> {}

// Schema de validação de dados
const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
    email: yup.string().min(10).required(),
    senha: yup.string().min(8).required()
});

export const loginValidation = validation({
    body: bodyValidation,
});

export async function login(req: Request<{}, {}, IBodyProps>, res: Response): Promise<Response> {
    try {
        const { email, senha } = req.body;

        const user = await UsuariosProvider.getByEmail(email);
        if (user instanceof Error || !user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: "Credenciais inválidas"
                }
            });
        }

        const correctPassword = await verifyPasswordHash(senha, user.senha);
        if (!correctPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: {
                    default: "Credenciais inválidas"
                }
            });
        }

        const privateKey = process.env.PRIVATE_KEY || "default_private_key";
        const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '1h' });

        return res.status(StatusCodes.OK).json({ token });

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Erro ao processar solicitação"
            }
        });
    }
}
