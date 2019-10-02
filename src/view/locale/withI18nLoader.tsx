import { Component } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { NextContext } from '@ws/react-next/types';
import get from 'lodash/fp/get';
import { setLocale } from '@ws/react-next/state/locales/actions';
import { getLocale } from '@ws/react-next/state/locales/selector';
import { StateType } from '@ws/react-next/types';
import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';

interface I18nLoaderStateType {
  catalogs: {};
  translations: string[];
}

interface I18NLoaderPropsType {
  language: string;
}

const withI18nLoader = (translation: string) => (Page: NextComponentType<NextPageContext>) => {
  class I18nLoader extends Component<I18NLoaderPropsType, I18nLoaderStateType> {
    static async getInitialProps(context: NextContext<StateType>) {
      const { req, store } = context;
      const locale: string = get('locals.locale', req);

      if (locale) {
        store.dispatch(setLocale(locale));
      }

      return Page.getInitialProps && (await Page.getInitialProps(context));
    }

    state = {
      catalogs: {},
      translations: [],
    };

    loadCatalog = async (language: string) => {
      const catalog = await import(
        /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `@lingui/loader!../../../locales/${language}/messages`
      );

      this.setState(state => ({
        catalogs: {
          ...state.catalogs,
          [language]: catalog,
        },
        translations: [...new Set([...state.translations, ...[translation]])],
      }));
    };

    shouldComponentUpdate(nextProps: I18NLoaderPropsType, nextState: I18nLoaderStateType) {
      const { language } = nextProps;
      const { catalogs } = nextState;

      if (
        (language !== this.props.language && !catalogs[language]) ||
        !this.state.translations.includes(translation)
      ) {
        this.loadCatalog(language);

        return false;
      }

      return true;
    }

    componentDidMount() {
      const { language } = this.props;

      if (language) {
        this.loadCatalog(language);
      }
    }

    render() {
      const { language } = this.props;
      const { catalogs } = this.state;

      if (!catalogs[language]) {
        return null;
      }

      return (
        <I18nProvider catalogs={catalogs} language={language}>
          <Page {...this.props} />
        </I18nProvider>
      );
    }
  }

  return connect<I18NLoaderPropsType, {}, I18nLoaderStateType, StateType>(state => ({
    language: getLocale(state),
  }))(I18nLoader);
};

export default withI18nLoader;
