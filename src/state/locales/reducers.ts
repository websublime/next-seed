import { combineReducers } from 'redux';
import { LOCALE_ACTION_TYPE, LocaleActions } from './actions';
import { StateType } from '@ws/react-next/types';

export const code = (state: StateType = null, { payload, type }: LocaleActions) => {
  switch (type) {
    case LOCALE_ACTION_TYPE.SET_LOCALE:
      return payload.locale;

    default:
      return state;
  }
};

export const locale = combineReducers({ code });
