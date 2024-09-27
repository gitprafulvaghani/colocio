// import type { PageServerLoad } from '../$types';
// // TODO: Generally don't use * imports. Use named imports instead. Only
// // using for development purposes.
// import * as facebookAccounts from '$lib/services/facebook/Accounts';
// import * as userAccount from '$lib/services/userAccount';
// import { json, type Actions } from '@sveltejs/kit';
// import {
//     PUBLIC_PEACH_ENTITY_ID,
//     PUBLIC_PEACH_ACCESS_TOKEN,
//     PUBLIC_PEACH_URL,
//     PUBLIC_EXCHANGE_ACCESS_KEY,
//     PUBLIC_EXCHANGE_URL,
// } from '$env/static/public';
// import queryString from 'query-string';

// export const load = (async ({ locals }) => {
//     const session = await locals.getSession();
//     const user = session?.user.id;

//     const requestSimple = async () => {
//         let response;
//         const data = {
//             entityId: PUBLIC_PEACH_ENTITY_ID,
//             amount: 10,
//             currency: 'USD',
//             paymentType: 'DB',
//             createRegistration: true,
//             // description: 'simple',
//         }
//         const URL =  PUBLIC_PEACH_URL + '/v1/checkouts?' + queryString.stringify(data);

//         const r = await fetch(URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization:
//                     'Bearer ' + PUBLIC_PEACH_ACCESS_TOKEN,
//             },
//         })
//         .then(r => r.json())
//         .then(r => {
//             console.log(r);
//             response = r;
//         }).catch(error => console.error('Error', error))
//         return response;
//     };

//     const requestBasic = async () => {
//         let response;
//         const data = {
//             entityId: PUBLIC_PEACH_ENTITY_ID,
//             amount: 100,
//             currency: 'USD',
//             paymentType: 'DB',
//             createRegistration: true,
//             // description: 'basic',
//         }
//         const URL =  PUBLIC_PEACH_URL + '/v1/checkouts?' + queryString.stringify(data);

//         const r = await fetch(URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization:
//                     'Bearer ' + PUBLIC_PEACH_ACCESS_TOKEN,
//             },
//         })
//         .then(r => r.json())
//         .then(r => {
//             console.log(r);
//             response = r;
//         }).catch(error => console.error('Error', error))
//         return response;
//     };

//     const requestPro = async () => {
//         let response;
//         const data = {
//             entityId: PUBLIC_PEACH_ENTITY_ID,
//             amount: 500,
//             currency: 'USD',
//             paymentType: 'DB',
//             createRegistration: true,
//             // description: 'pro'
//         }
//         const URL =  PUBLIC_PEACH_URL + '/v1/checkouts?' + queryString.stringify(data);

//         const r = await fetch(URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization:
//                     'Bearer ' + PUBLIC_PEACH_ACCESS_TOKEN,
//             },
//         })
//         .then(r => r.json())
//         .then(r => {
//             console.log(r);
//             response = r;
//         }).catch(error => console.error('Error', error))
//         return response;
//     };

//     const requestEnterprise = async () => {
//         let amount = 999;
//         let exchangeData = {
//             access_key: PUBLIC_EXCHANGE_ACCESS_KEY,
//             base: 'USD',
//             symbols: 'ZAR,USD',
//         }
//         const exchange = await fetch(PUBLIC_EXCHANGE_URL + "/v1/latest?" + 
//         queryString.stringify(exchangeData), {
//             method: 'GET',
//         })
//         .then(exchange => exchange.json())
//         .then(exchange => {
//             console.log(exchange);
//             response = exchange;
//         }).catch(error => console.error('Error', error))

//         let response;
//         const data = {
//             entityId: PUBLIC_PEACH_ENTITY_ID,
//             amount: 500,
//             currency: 'ZAR',
//             paymentType: 'DB',
//             createRegistration: true,
//             // description: 'pro'
//         }
//         const URL =  PUBLIC_PEACH_URL + '/v1/checkouts?' + queryString.stringify(data);

//         const r = await fetch(URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 Authorization:
//                     'Bearer ' + PUBLIC_PEACH_ACCESS_TOKEN,
//             },
//         })
//         .then(r => r.json())
//         .then(r => {
//             console.log(r);
//             response = r;
//         }).catch(error => console.error('Error', error))
//         return response;
//     };
//     // const paymentSimple = await requestSimple();
//     // const paymentBasic = await requestBasic();
//     // const paymentPro = await requestPro();
//     const paymentEnterprise = await requestEnterprise();
//     return { user, paymentSimple, paymentBasic, paymentPro, paymentEnterprise
//      };
// }) satisfies PageServerLoad;
