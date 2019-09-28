/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import config from 'config';
import cookies from 'cookies-js';
import get from 'lodash/fp/get';
import has from 'lodash/fp/has';
import find from 'lodash/fp/find';
import cloneDeep from 'lodash/fp/cloneDeep';

const settings = window._config;

export const clientConfig = {
  ...config,
  get: (key: string) => get(key, settings),
  has: (key: string) => has(key, settings),
};

export function getApiUrl(endpoint: string) {
  const baseUrl = config.get<string>('public.apiUrl').replace(/\/$/, '');
  const trimEndpoint = endpoint.replace(/^\//, '');

  return `${baseUrl}/${trimEndpoint}`;
}

export function setAuthorizationCookie(token: string): void {
  cookies.set('auth-token', token);
}

export function expireAuthorizationCookie(): void {
  cookies.expire('auth-token');
}

export function setLocaleCookie(locale: string): void {
  cookies.set('locale', locale);
}

export function authorizationHeader(token?: string) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isLarge(width: number) {
  return width > 992;
}

export function routePattern(route: string) {
  const { pattern } = find(
    { name: route },
    config.get<AppConfig['public']['routes']>('public.routes'),
  );

  return pattern;
}

export default function nullifyEmptyValues(data: object) {
  const clonedData = cloneDeep(data);

  for (const key in clonedData) {
    if (clonedData[key] === '' || clonedData[key] === undefined) {
      clonedData[key] = null;
    }
  }

  return clonedData;
}

export const imagePlaceholder =
  'data:image/png;base64,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';
