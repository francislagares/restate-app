import { Query } from 'react-native-appwrite';

import { ApiError } from '@/lib/error/api';

import { databases } from '../config/appwrite.client';
import { appwriteConfig } from '../config/appwrite.config';

type PropertyQuery = {
  filter: string;
  query: string;
  limit?: number;
};

export const getLatestProperties = async () => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      [Query.orderAsc('$createdAt'), Query.limit(5)],
    );

    return response.documents;
  } catch (error) {
    throw new ApiError('Failed to get latest properties');
  }
};

export const getProperties = async ({
  filter,
  query,
  limit,
}: PropertyQuery) => {
  try {
    const buildQuery = [Query.orderDesc('$createdAt')];

    if (filter && filter !== 'All')
      buildQuery.push(Query.equal('type', filter));

    if (query)
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ]),
      );

    if (limit) buildQuery.push(Query.limit(limit));

    const response = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      buildQuery,
    );

    return response.documents;
  } catch (error) {
    throw new ApiError('Failed to get properties');
  }
};

export const getProperty = async ({ propertyId }: { propertyId: string }) => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.propertiesCollectionId!,
      propertyId,
    );

    return response;
  } catch (error) {
    throw new ApiError('Failed to get property');
  }
};
