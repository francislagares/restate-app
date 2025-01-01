import { Account, Avatars, Client, Databases } from 'react-native-appwrite';

import { appwriteConfig } from './appwrite.config';

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint || '')
  .setProject(appwriteConfig.projectId || '')
  .setPlatform(appwriteConfig.platform || '');

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
