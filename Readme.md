# migration command

- first, web application start then according using run command

- then checked database connect locally or real database

- then blow given migration command run using git bash sell not used powershell

- npm run migration:generate -- src/database/migrations/migration1 -d src/database/data-source.ts

- npm run migration:run -- -d src/database/data-source.ts

- npm run migration:revert -- -d src/database/data-source.ts

```javascript
//script (package.json)
 "migration:create": "typeorm-ts-node-commonjs migration:create",
    "migration:revert": "typeorm-ts-node-commonjs migration:revert",
    "migration:generate": "typeorm-ts-node-commonjs migration:generate",
    "migration:run": "typeorm-ts-node-commonjs migration:run",
```

- our awsome service

- new added

# docker images command

- docker build -t my-auth-service:latest -f docker/production/Dockerfile .

- docker run -p 5503:5503 --name my-auth-service-container my-auth-service:latest

- docker build -t pinnacle731/mern-space-auth-service-dev -f .\docker\development\Dockerfile .

```javascript
console.log('NODE_ENV =>', process.env.NODE_ENV, 'PORT => ', process.env.PORT);
console.log('current Path', path.resolve(__dirname));
console.log(
  'folder ENV Path',
  path.resolve(__dirname, `../../.env.${process.env.NODE_ENV ?? nodeENV}`),
);
console.log('my host =>', process.env.DB_HOST);


// if any required then change the database/data-source
synchronize:true
 entities: ['src/database/entities/*.{ts,js}'], // Add all your entities here
  migrations: ['src/database/migrations/*.{ts,js}'],
```

```javascript
 let privateKey: string;

  if (!configEnv.privatekey) {
    const error = createHttpError(500, 'Private key not found');
    throw error;
  }

  try {
    privateKey = configEnv.privatekey;
  }
```

# How to set up production:

1. **setup dist folder path in data-source.ts file(entities, migration)**

```js
export const AppDataSource = async (): Promise<DataSource | undefined> => {

  try {

    // Create the DataSource instance
    const dataSource = new DataSource({
      entities: ['dist/src/database/entities/*.{ts,js}'],
      migrations: ['dist/src/database/migrations/*.{ts,js}'],
      ssl: false,
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
```

2. **copy .env.dev or .env.prod in the dist folder including setup database**

3. **then run build command `npm run build` with then dist/src folder updated**

4. **then create database table using migration in bash sell**

```bash
npm run migration:generate -- src/database/migrations/<migration_file> -d src/database/data-source.ts

npm run migration:run -- -d src/database/data-source.ts

npm run migration:revert -- -d src/database/data-source.ts
```

docker login -u pinnacle731

- how to connect rds: https://www.youtube.com/watch?v=fF-5ZX_cDz4
