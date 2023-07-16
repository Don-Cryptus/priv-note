import type { Dispatcher } from 'undici';
import { request } from 'undici';
import { env } from '$env/dynamic/private';
import type { Messages } from '$lib/@types';

export const client = async <T = Messages[]>(
  path: string,
  options?: Parameters<typeof request>['1']
): Promise<{ body: { json: () => Promise<T> } } & Dispatcher.ResponseData> => {
  return await request(env.SECRET_ENDPOINT + path, {
    headers: { 'Content-Type': 'application/json', SECRET: env.SECRET_API_SECRET, ...options?.headers },
    ...options
  });
};
