import Joi from '@hapi/joi';

export const noteValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().min(2).required(),
    Descreption: Joi.string().min(2).required(),
    color: Joi.string()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
