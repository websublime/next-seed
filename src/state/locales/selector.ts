import get from 'lodash/fp/get';
import { StateType } from '@ws/react-next/types';

export function getLocale(state: StateType) {
  return get('code', state.locale);
}
