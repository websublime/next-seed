/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import { app } from './app';
import { get } from 'config';

export default app().then(server => {
  const host = get<string>('server.listen.hostname');
  const port = get<number>('server.listen.port');

  server.listen(port, host);

  server.once('[SERVER] Listening', () => (process.send ? process.send('Ready') : () => {}));

  console.log(`[SERVER] Koa listening on ${host}:${port}`);
});
