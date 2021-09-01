const Joi = require('joi')

userIDSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

skillSchema = Joi.object({
    name: Joi.array(),
        /* .alphanum()
        .case('lower')
        .min(3)
        .max(30)
        .required(), */
    
    type: Joi.string()
        .alphanum()
        .case('lower')
        .min(3)
        .max(30)
        .required(),

})

module.exports = {
    userIDSchema,
    skillSchema,
}