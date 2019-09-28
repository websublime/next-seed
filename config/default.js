'use strict';

/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

module.exports = {
  public: {
    apiUrl: 'https://reqres.in/',
    locales: ['en', 'pt'],
    mainCountries: ['PT', 'EN'],
    routes: [
      {
        name: 'home',
        page: 'index',
        pattern: '/',
      },
    ],
    uploads: {
      filters: {
        image: ['image/jpeg', 'image/png'],
      },
      maxSize: 12000000,
    },
  },
  server: {
    listen: {
      hostname: '0.0.0.0',
      port: 2000,
    },
  },
};
