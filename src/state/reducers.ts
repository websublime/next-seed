import { combineReducers } from 'redux';
import { locale } from './locales/reducers';

const rootReducer = combineReducers({
  locale,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
