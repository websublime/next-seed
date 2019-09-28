/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */
import Koa from 'koa';

export const authorizationMiddleware = async (
  context: Koa.BaseContext,
  next: () => Promise<any>,
) => {
  context.req.locals = {
    ...context.req.locals,
    token: context.cookies.get('auth-token'),
  };

  await next();
};
