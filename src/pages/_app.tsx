/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import '@ws/react-next/theming/theme.less';
import App, { AppContext } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { compose } from 'recompose';
import withRedux from 'next-redux-wrapper';
import { initStore } from '@ws/react-next/state/shared/store/store-config';
import { Store } from 'redux';
import { StateType } from '@ws/react-next/types';

interface AppPropsInterface {
  store: Store<StateType>;
}

class Application extends App<AppPropsInterface> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default compose(withRedux(initStore))(Application);
