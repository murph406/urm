import axios from 'axios';

let IS_DEV = false;
let BASE_URL = 'http://localhost:8888/api'

if (!IS_DEV) {
  BASE_URL = 'https://urm-api.herokuapp.com/api';
}

// const GET_STORE_BY_CODE = '/store/get-one/';
// const GET_ITEMS_BY_STORE = '/get-items/';

const GET_NEW_ITEMS = '/item/get-new-items';
// const UPDATE_ITEM_STATUS = '/item/update-status';
const GET_ITEMS_ALL = '/item/get-all';

const GET_ITEM_GROUPS = '/special/get-all-groups';

const CREATE_ORDER = '/order/create';


export function getNewItems(callback) {
  axios.get(BASE_URL + GET_NEW_ITEMS)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function getItemsAll(callback) {
  axios.get(BASE_URL + GET_ITEMS_ALL)
    .then(res => callback(null, res.data))
    .catch(e => callback(e))
}

export function getAllItemGroups(callback) {
  axios.get(BASE_URL + GET_ITEM_GROUPS)
    .then(res => callback(null, res.data))
    .catch(e => callback(e))
}

export function createOrder(order, callback) {
  let sender = {
    order: order
  }
  axios.post(BASE_URL + CREATE_ORDER, sender)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

// export function getStoreByCode(code, callback) {
//   axios.get(BASE_URL + GET_STORE_BY_CODE + code)
//     .then(response => callback(null, response.data))
//     .catch(e => callback(e))
// }

// export function getItemsByStore(storeID, callback) {
//   axios.get(BASE_URL + GET_ITEMS_BY_STORE + storeID)
//     .then(response => callback(null, response.data))
//     .catch(e => callback(e))
// }

// export function updateItemStatus(status, callback) {
//   axios.post(BASE_URL + UPDATE_ITEM_STATUS, status).then((response) => {
//     callback(null, response.data)
//   }).catch((e) => {
//     callback(e, null)
//   })
// }

