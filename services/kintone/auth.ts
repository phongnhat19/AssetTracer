import base64 from 'react-native-base64';

const KINTONE_ENDPOINT = 'https://5s2re.kintone.com';

export const login = async (username: string, password: string) => {
  const key = base64.encode(`${username}:${password}`);
  const myHeaders = new Headers();
  myHeaders.append('X-Cybozu-Authorization', key);
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'manual',
  };

  const response = await fetch(
    `${KINTONE_ENDPOINT}/k/v1/apps.json`,
    requestOptions,
  );

  const responseJSON = await response.json();
  if (responseJSON.code) {
    throw new Error(responseJSON.message);
  }
  return {
    key,
  };
};
