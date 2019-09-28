/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import Koa from 'koa';
import { nextApp } from './next';
import { authorizationMiddleware } from '../middlewares/authorization-middleware';
import { configurationMiddleware } from '../middlewares/configuration-middleware';
import { localeMiddleware } from '../middlewares/locale-middleware';
import { router } from '@ws/react-next/core/share/routes';
import { hsts, xssFilter, noSniff, frameguard, ieNoOpen } from 'koa-helmet';

export const app = async () => {
  const app = new Koa();
  const handler = router.getRequestHandler(nextApp);

  await nextApp.prepare();

  app.use(hsts({ maxAge: 31536000 }));
  app.use(xssFilter());
  app.use(noSniff());
  app.use(frameguard({ action: 'deny' }));
  app.use(ieNoOpen());

  app.on('error', error => {
    if (error.code === 'EPIPE') {
      console.log('Koa app-level EPIPE error.', { error });
    } else {
      console.log('Koa app-level error', { error });
    }
  });

  app.use(authorizationMiddleware);
  app.use(configurationMiddleware);
  app.use(localeMiddleware);

  app.use(async context => {
    handler(context.req, context.res);

    context.respond = false;
    context.res.statusCode = 200;
  });

  return app;
};
