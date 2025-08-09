import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rsaPemToJwk from 'rsa-pem-to-jwk';
import { createHash } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../certs/private.pem'),
  'utf-8',
);

const jwk = rsaPemToJwk(privateKey, { use: 'sig', alg: 'RS256' }, 'public');

// Optionally add a `kid` (key ID), useful for JWT verification
jwk.kid = createHash('sha256').update(privateKey).digest('hex').slice(0, 10);

// Final JWKS structure
const jwks = { keys: [jwk] };

// Write it to the public folder
const outputPath = path.resolve(__dirname, '../public/.well-known/jwks.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(jwks, null, 2));

// eslint-disable-next-line no-console
// console.log('JWKS written to', outputPath);
// console.log(JSON.stringify(jwk));
