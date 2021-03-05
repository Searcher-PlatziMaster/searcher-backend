const joi = require('joi');

let genders = ['Female','Male'];
let departaments = ['Amazonas' ,
'Antioquia' ,
'Arauca' ,
'Atlantico' ,
'Bolivar'  ,
'Boyaca' ,
'Caldas' ,
'Caqueta' ,
'Casanare',
'Cauca',
'Cesar',
'Choco',
'Cordoba' ,
'Cundinamarca' ,
'Guainia' ,
'Guaviare',
'Huila',
'La Guajira',
'Magdalena',
'Meta',
'Nariño',
'Putumayo',
'Quindio',
'Risaralda',
'Santander',
'Sucre',
'Tolima',
'Vaupes',
'Vichada',
'San Andres y Providencia',
'Norte de Santander', 
'Valle del Cauca']

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}&/);
const firstNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a name, if you think its an error please contact with an administrator.');
const passwordSchema = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number');
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).message('That doesnt looks like a valid email');
const lastNameSchema = joi.string().max(250).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/)
const birthDateSchema = joi.string().max(10).regex(/[12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])/).message('Format date of birth is yyyy/mm/dd ')
const genderSchema = joi.string().valid(...genders)
const jobSchema = joi.string()
const departamentsSchema = joi.string().valid(...departaments)

const createUserSchema = {
    name: firstNameSchema.required(),
    password: passwordSchema.required(),
    email: emailSchema.required(),
    lastName: lastNameSchema.required(),
    birthDate: birthDateSchema.required(),
    gender: genderSchema.required(),
    job: jobSchema.required(),
    department: departamentsSchema.required()

};

const updateUserSchema = {
    name: firstNameSchema,
    password: passwordSchema,
    email: emailSchema,
    lastName: lastNameSchema,
    birthDate: birthDateSchema,
    gender: genderSchema,
    job: jobSchema,
    department: departamentsSchema
}

module.exports = {
    userIdSchema,
    createUserSchema,
    updateUserSchema,
};