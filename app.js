import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, './.env');

import dotenv from 'dotenv';
dotenv.config({ path: envPath });

const { GITHUB_TOKEN } = process.env;

import repositoryCreator from 'repository_creator';
import repositoryDeletor from 'repository_deletor';

export default async function (method, data) {
  try {
    switch (method) {
      case 'create':
        data.push(false);
        data.push('Node');
        return await repositoryCreator(GITHUB_TOKEN, data);
      case 'delete':
        return await repositoryDeletor(GITHUB_TOKEN, data);
      default:
        throw new Error('Invalid method provided.');
    }
  } catch (error) {
    console.error('Github_Manager encountered an error:');
    console.error(error);
  }
}
