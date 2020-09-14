import {KINTONE_ENDPOINT, ASSET_APP_ID} from './config';

export const getAssetDetail = async (recordID: string, token: string) => {
  const myHeaders = new Headers();
  myHeaders.append('X-Cybozu-Authorization', token);
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'manual',
  };

  const response = await fetch(
    `${KINTONE_ENDPOINT}/k/v1/record.json?app=${ASSET_APP_ID}&id=${recordID}`,
    requestOptions,
  );

  const responseJSON = await response.json();
  if (responseJSON.code) {
    throw new Error(responseJSON.message);
  }
  return responseJSON.record;
};
