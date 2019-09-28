/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import Koa from 'koa';
import { get } from 'config';

export const localeMiddleware = async (context: Koa.BaseContext, next: () => Promise<any>) => {
  const locales = get<string[]>('public.locales');

  let locale = context.cookies.get('locale');

  if (!locale) {
    locale = context.acceptsLanguages(locales) || locales[0];

    context.cookies.set('locale', locale, { httpOnly: false });
  }

  context.req.locals = {
    ...context.req.locals,
    locale,
  };

  await next();
};
