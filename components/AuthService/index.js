import buffer from 'buffer';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

const AUTHENTICATION_KEY = 'auth';
const USER_KEY = 'user';

export default function gitLogin(username, password) {
  debugger;
  const encodeAuthentication = encodeUsernameAndPassword(username, password);
  const url = 'https://api.github.com/users';
  const headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Basic ${encodeAuthentication}`,
    },
  };

  return fetch(url, { headers })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw {
      badCredentials: response.status === 401,
      unknownError: response.status !== 401,
    };
  })
  .then(response => response.json())
  .then(response => saveAuthenticationAndUserDataInStorage(encodeAuthentication, response))
  .catch(error => {
    throw error;
  });
}

export function getAuthenticationInfo(cb) {
  AsyncStorage.multiGet([AUTHENTICATION_KEY, USER_KEY], (err, val) => {
    if (err) {
      return cb(err);
    }

    if (!val) {
      return cb();
    }

    const zippedObj = _.fromPairs(val);
    if (!zippedObj[AUTHENTICATION_KEY]) {
      return cb();
    }

    const authInfo = {
      header: {
          Authorization: `Basic ${zippedObj[AUTHENTICATION_KEY]}`,
      },
      user: JSON.parse(zippedObj[USER_KEY]),
    };

    return cb(null, authInfo);
  });
}

function saveAuthenticationAndUserDataInStorage(encodeAuth, response) {
  AsyncStorage.multiSet([
    [AUTHENTICATION_KEY, encodeAuth],
    [USER_KEY, JSON.stringify(response)],
  ], (err) => {
    if (err) {
      throw err;
    }
    return;
  });
}

function encodeUsernameAndPassword(username, password) {
  const loginBuffer = new buffer.Buffer(`${username}:${password}`);
  return loginBuffer.toString('base64');
}
