import { Config } from '../lib/properties'

const URL = Config.protocol + Config.ip + ":" + Config.port;

export function _insertUser(body) {

    return fetch(URL + Config.signUp, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
    })
    .catch((error) =>{
        console.error(error);
    });
}
