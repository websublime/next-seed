/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import get from 'lodash/fp/get';
import Error, { ErrorProps } from 'next/error';
import React, { Component } from 'react';
import { NextPageContext } from 'next';

export default class ErrorPage extends Component<ErrorProps, {}> {
  static getInitialProps({ err, res }: NextPageContext) {
    let statusCode: number;

    if (get('statusCode', err)) {
      statusCode = err.statusCode;
    }

    if (get('statusCode', res)) {
      statusCode = res.statusCode;
    }

    return { statusCode: statusCode || 404 };
  }

  render() {
    return <Error statusCode={404} {...this.props} />;
  }
}
