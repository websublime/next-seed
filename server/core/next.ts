/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import next from 'next';
//import { nextConfig } from './next.config';

const isProduction = process.env.NODE_ENV === 'production';

export const nextApp = next({
  dev: !isProduction,
  dir: './src',
});
