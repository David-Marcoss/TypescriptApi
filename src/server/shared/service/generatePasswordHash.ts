import bcrypt from "bcrypt"

export function generatePasswordHash(password: string): Promise<string> {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);
            else resolve(hash);
        });
    });
}

export function verifyPasswordHash(password: string, hashPassword:string): Promise<boolean> {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, function(err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
}