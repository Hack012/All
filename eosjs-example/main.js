//EOSjs를 사용하기 위한 환경설정
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { PrivateKey, PublicKey, Signature, Aes, key_utils, config } = require('eosjs-ecc');
const { TextEncoder, TextDecoder } = require('util');
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env' });

//실제로 사용하게 될 실제 객체(rpc, api)
let privateKeys = ['5JbgMdXHTcDYDqs1mBsAzMq4XBwJek4jqRG2Y2h4M9VUfvEAVS9'];
const rpc = new JsonRpc('http://127.0.0.1:8011', { fetch });
const signatureProvider = new JsSignatureProvider(privateKeys);
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

async function main() {
    try {
        const result2 = await rpc.get_currency_balance('eosio.token', 'wonwonwonwon', 'EOS');
        console.log(result2);

        const result = await api.transact({
            actions: [{
              account: 'eosio.token',
              name: 'transfer',
              authorization: [{
                actor: 'wonwonwonwon',
                permission: 'active',
              }],
              data: {
                from: 'wonwonwonwon',
                to: 'mjwmjw123123',
                quantity: "1.0000 EOS",
                memo: 'hihihihihihihihihi',
              }
            }]
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          });

          const result3 = await rpc.get_currency_balance('eosio.token', 'baekseokinit', 'EOS');
         console.log(result3);

        } catch (error) {
        console.error(error);
        }

}

main();