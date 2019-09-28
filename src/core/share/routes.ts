/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import { get } from 'config';
import Router from 'next-routes';

const router = new Router();

get<string[]>('public.routes').forEach(route => router.add(route));

export { router };
