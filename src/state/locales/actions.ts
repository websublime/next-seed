export enum LOCALE_ACTION_TYPE {
  SET_LOCALE = '[Locale] SET_LOCALE',
}

export type LocaleType = {
  locale: string;
};

export const setLocale = (locale: string): ActionType<LocaleType, LOCALE_ACTION_TYPE> => ({
  payload: { locale },
  type: LOCALE_ACTION_TYPE.SET_LOCALE,
});

export type LocaleActions = ActionType<LocaleType, LOCALE_ACTION_TYPE>;
