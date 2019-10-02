/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import reducer from '../../reducers';
import { StateType } from '@ws/react-next/types';

// eslint-disable-next-line no-underscore-dangle, no-undef
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const initStore = (initialState = {}): Store<StateType, any> => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware, apiMiddleware)),
  );
};
