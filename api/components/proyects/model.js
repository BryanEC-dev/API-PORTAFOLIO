const Joi = require('joi')

userIDSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

proyectSchema = Joi.object({
    name: Joi.string()
        .case('lower')
        .min(3)
        .max(30)
        .required(),
    
    description: Joi.string()
        .case('lower')
        .min(3)
        .max(200)
        .required(),
    link: Joi.string()
        .case('lower')
        .min(5)
        .max(100)
        .required(),
    imagen: Joi.string()
        .alphanum()
        .min(5)
        .max(50)
        .required(),
    
        
})

module.exports = {
    userIDSchema,
    proyectSchema,
}