import React from 'react';
import axios from 'axios';

const BASE_URL = 'https://urm-api.herokuapp.com/api';
const GET_ITEMS_BY_STORE = '/get-items/';

export function getItemsByStore(storeID, callback) {
  axios.get(BASE_URL + GET_ITEMS_BY_STORE + storeID)
    .then(response => callback(null, response.data))
    .catch(e => callback(e))
}
