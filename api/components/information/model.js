const Joi = require('joi')

let userIDSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

let informationSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .case('lower')
        .min(3)
        .max(30)
        .required(),
    
    lastName: Joi.string()
        .alphanum()
        .case('lower')
        .min(3)
        .max(30)
        .required(),
    profesion: Joi.string()
        /* .any() */
        .case('lower')
        .min(5)
        .max(60)
        .required(),
    country: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
    city: Joi.string()
        .alphanum()
        .case('lower')
        .min(5)
        .max(30)
        .required(),
    linkedin: Joi.string()
        /* .alphanum() */
        .case('lower')
        .trim()
        /* .uri({}) */
        .min(5)
        .max(100),

    github: Joi.string()
        /* .alphanum() */
        .case('lower')
        .trim()
        .min(5)
        .max(100),
        
})

module.exports = {
    userIDSchema,
    informationSchema,
}