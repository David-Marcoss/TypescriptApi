
import  * as Create from "./Create"
import * as getById from "./GetById"
import * as deleteById from "./DeleteById"
import * as updateById from "./UpdateById"
import * as getAll from "./GetAll"


export const CidadesProvider = {
    ...Create,
    ...getById,
    ...deleteById,
    ...updateById,
    ...getAll
}