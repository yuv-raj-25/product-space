import { Sequelize } from "sequelize";

import { env } from "./env";

const sharedOptions = {
  dialect: "postgres" as const,
  logging: env.db.logging ? console.log : false,
  dialectOptions: env.db.ssl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined,
};

export const sequelize = env.db.url
  ? new Sequelize(env.db.url, sharedOptions)
  : new Sequelize(env.db.name, env.db.user, env.db.password, {
      host: env.db.host,
      port: env.db.port,
      ...sharedOptions,
    });

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
};
