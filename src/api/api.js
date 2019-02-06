import React from 'react';
import axios from 'axios';

const BASE_URL = 'https://urm-api.herokuapp.com/api';
const GET_ITEMS_BY_STORE = '/get-items/';
const UPDATE_ITEM_STATUS = '/item/update-status';
const GET_USERS = '/user/get-all';
const GET_NEW_ITEMS = '/item/get-new-items'


export function getItemsByStore(storeID, callback) {
  axios.get(BASE_URL + GET_ITEMS_BY_STORE + storeID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}

export function updateItemStatus(status, callback) {
  axios.post(BASE_URL + UPDATE_ITEM_STATUS, status).then((response) => {
    callback(null, response.data)
  }).catch((e) => {
    callback(e, null)
  })
}

export function getUsers(callback) {
 
  axios.get(BASE_URL + GET_USERS)
  .then(response => callback(null,response.data))
  .catch(e => callback(e))
}

export function getNewItems(callback) {
 
  axios.get(BASE_URL + GET_NEW_ITEMS)
  .then(response => callback(null,response.data))
  .catch(e => callback(e))
}

