/// <reference types="next" />
/// <reference types="next/types/global" />

declare type AppConfig = {
  public: {
    apiUrl: string;
    locales: string[];
    mainCountries: string[];
    routes: [
      {
        name: string;
        page: string;
        pattern: string;
      },
    ];
  };
  server: {
    listen: {
      hostname: string;
      port: number;
    };
  };
};

interface ActionType<PAYLOAD, TYPE> {
  payload: PAYLOAD;
  type: TYPE;
}

interface Window {
  _config: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare var window: Window;
