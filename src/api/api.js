import axios from 'axios';
import { AsyncStorage } from 'react-native';

let IS_DEV = false;
let BASE_URL = 'http://localhost:8888/api'

if (!IS_DEV) {
  BASE_URL = 'https://urm-api.herokuapp.com/api';
}
// AsyncStorage.getItem('@key:my_orders', (err, result) => {
//   console.log('yeeeeah', result)
// })
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


const ORDERS_KEY = '@key:my_orders';
export function order(order) {
  console.log('ORDERRRRR', order)
  let sender = {
    order: order
  }

  return new Promise((resolve, reject) => {
    axios.post(BASE_URL + CREATE_ORDER, sender)
      .then(response => {
        resolve(response)
      })
      .catch(async(e) => {
        let orders = await AsyncStorage.getItem(ORDERS_KEY)

        // if no orders were saved, i.e. this is first order thats gonna be saved, then
        // create the model thats gonna be stored. Which is 
        /**
         * [
         *  {
         *    date_created, order: [], status
         *  }
         * ]
         */
        // So array of objects where the order lives on the array
        if(orders == null) {
          orders = []          
        } else {
          // otherwise, there are other orders saved, so lets parse them so we can add to it
          orders = JSON.parse(orders)
        }
        
        orders.push({
          date_created: new Date(),
          order: order,
          status: 'pending'
        })

        let status = await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders))

        resolve({ status: 'order saved'})
      })
  })
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

