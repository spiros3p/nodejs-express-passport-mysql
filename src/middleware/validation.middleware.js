import Joi from 'joi';

const schemaUserSignUp = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
    password: Joi.string().min(5),
});

export const validationUserSignUp = async (req, res, next) => {
    let validity = undefined;
    try {
        validity = await schemaUserSignUp.validateAsync(req.body);
        if (validity.error) {
            const errorMessage = validity.error.details[0].message;
            return res.status(400).json({ error: errorMessage });
        }
        next();
    } catch (e) {
        const message = e.message.split(' (')[0];
        return res.status(400).json({ error: message });
    }
};
