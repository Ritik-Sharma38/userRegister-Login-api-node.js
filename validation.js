const Joi = require('joi')

const registerValidation = async (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    const { error, value} = await schema.validate(data)
    return error
}

const loginValidation = async (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    const { error, value} = await schema.validate(data)
    return error
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation