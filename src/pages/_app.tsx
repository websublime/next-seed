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

interface AppPropsInterface {
  store: Store<StateType>;
}

const Layout = (props: React.Props<any>) => {
  return <div className="ui-layout" {...props}></div>;
};

class Application extends App<AppPropsInterface> {
  static async getInitialProps(appContext: AppContext) {
    // eslint-disable-next-line no-undef
    // const { device } = ctx.isServer ? parser(ctx.req.headers['user-agent']) : parser(window.navigator.userAgent);
    //const isMobile = device.type === 'mobile' || device.type === 'tablet';
    const pageProps = App.getInitialProps(appContext); //Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {
      pageProps: {
        ...pageProps,
        // isMobile
      },
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    );
  }
}

export default compose(withRedux(initStore))(Application);
