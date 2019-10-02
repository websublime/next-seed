import { Action, AnyAction, Store } from 'redux';
import { NextPageContext } from 'next';

export interface StateType {
  locale: {
    code: string;
  };
}

export interface NextContext<S = any, A extends Action = AnyAction> extends NextPageContext {
  store: Store<S, A>;
  isServer: boolean;
}
