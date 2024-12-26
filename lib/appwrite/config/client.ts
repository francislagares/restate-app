import { Client } from 'react-native-appwrite';

import { appwriteConfig } from './appwrite.config';

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint || '')
  .setProject(appwriteConfig.projectId || '')
  .setPlatform(appwriteConfig.platform || '');
