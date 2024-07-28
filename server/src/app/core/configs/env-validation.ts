import * as Joi from 'joi';
import { NodeEnvironment } from 'src/app/shared/enums/NodeEnvironment.enum';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NodeEnvironment))
    .default(NodeEnvironment.DEV),
  PORT: Joi.number().default(3000),
  BASE_URL: Joi.string().default('http://127.0.0.1'),
});
