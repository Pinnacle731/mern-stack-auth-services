import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { configEnv } from '../config/config';
// import { getFileFromS3 } from '../services/s3Service';
import logger from '../config/logger';
import createHttpError from 'http-errors';
import { getFileFromS3 } from '../services/s3Service';

export const AppDataSource = async (): Promise<DataSource | undefined> => {
  logger.info('database app datasource calling');

  try {
    // Load the SSL certificate synchronously
    const rdsSSL = await getFileFromS3(
      configEnv.awsS3BucketName,
      configEnv.awsS3RdsSSL,
    );
    // Create the DataSource instance
    const dataSource = new DataSource({
      type: 'postgres',
      host: configEnv.dbHost,
      port: Number(configEnv.dbPort),
      username: configEnv.dbUsername,
      password: configEnv.dbPassword,
      database: configEnv.dbDatabase,
      // synchronize: !configEnv.isProduction, // 👈 here
      synchronize: false, // 👈 here
      logging: false,
      entities: ['src/database/entities/*.{ts,js}'],
      migrations: ['src/database/migrations/*.{ts,js}'],
      /* dist folder in use only developing mode build `npm build` then use it `npm start`*/
      ssl:
        configEnv.nodeEnv === 'test'
          ? {
              ca: configEnv.rdsSSL.replace(/\\n/g, '\n'),
              rejectUnauthorized: false,
            }
          : {
              ca: rdsSSL,
              rejectUnauthorized: false,
            },
    });

    return dataSource;
    /* sonarqube-ignore-start */
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error setting up data source:', error.message);
    } else {
      throw createHttpError(500, 'Error setting up data source');
    }
  }
  /* sonarqube-ignore-end */
};
