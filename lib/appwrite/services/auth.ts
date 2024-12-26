import * as linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, OAuthProvider } from 'react-native-appwrite';

import { AuthError } from 'lib/error/auth';

import { client } from '../config/appwrite.client';

const extractAuthCredentials = (url: URL) => {
  const secret = url.searchParams.get('secret')?.toString();
  const userId = url.searchParams.get('userId')?.toString();

  if (!secret || !userId) {
    throw new AuthError('Missing authentication credentials');
  }

  return { userId, secret };
};

export const avatar = new Avatars(client);
export const account = new Account(client);

export const login = async () => {
  try {
    const redirectUri = linking.createURL('/');

    const token = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri,
    );

    if (!token) {
      throw new AuthError('Failed to create OAuth2 token');
    }

    const browserResult = await openAuthSessionAsync(
      token.toString(),
      redirectUri,
    );

    if (browserResult.type !== 'success') {
      throw new AuthError('Browser authentication failed');
    }

    const url = new URL(browserResult.url);
    const { userId, secret } = extractAuthCredentials(url);

    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new AuthError('Failed to create session');
    }

    return session;
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(`Authentication error: ${error.message}`);
    } else {
      console.error('Unexpected error during login:', error);
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession('current');

    return true;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = await avatar.getInitials(response.name);

      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
