import { NodeEnvironment } from '../enums/NodeEnvironment.enum';

export interface IEnvConfig {
  PORT: string | number;
  NODE_ENV: NodeEnvironment;
  BASE_URL: string;
}
