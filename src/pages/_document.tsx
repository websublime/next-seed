/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import get from 'lodash/fp/get';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';

export default class WindowDocument extends Document<{ config: any }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const { chunks, errorHtml, head, html } = ctx.renderPage() as any;

    return {
      ...initialProps,
      chunks,
      config: get('locals.config', ctx.req),
      errorHtml,
      head,
      html,
    };
  }

  render() {
    const { config } = this.props;

    return (
      <html>
        <Head>
          <meta content={'width=device-width,initial-scale=1,shrink-to-fit=no'} name={'viewport'} />
          <link href={'/static/images/favicon.ico'} rel={'icon'} type={'image/x-icon'} />
          <script
            // eslint-disable-next-line react/no-danger, id-match
            dangerouslySetInnerHTML={{ __html: `var _config = ${config}` }}
          />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}
