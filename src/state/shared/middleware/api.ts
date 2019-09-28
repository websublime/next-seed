/**
 * @license
 * Copyright Websublime. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://www.websublime.com/license
 */

import axios from 'axios';

export const CALL_API = Symbol('CALL_API');

function createMiddleware() {
  return ({ getState }) => next => async action => {
    const callAPI = action[CALL_API];

    if (callAPI === undefined) {
      return next(action);
    }

    const { bailout, errorMapper, meta, payload, request, types } = callAPI;
    const [PENDING, FULFILLED, REJECTED] = types;

    // Handle bailout.
    if (
      (typeof bailout === 'boolean' && bailout) ||
      (typeof bailout === 'function' && bailout(getState()))
    ) {
      return;
    }

    next({ meta, type: PENDING });

    try {
      const result = await axios({
        ...request,
        validateStatus: status => status < 400,
      });

      return next({
        meta,
        payload: payload(result.data),
        type: FULFILLED,
      });
    } catch (error) {
      const payload = errorMapper(error, { method: request.method });

      next({ meta, payload, type: REJECTED });

      throw error;
    }
  };
}

export default ({ getState }) => createMiddleware()({ getState });
