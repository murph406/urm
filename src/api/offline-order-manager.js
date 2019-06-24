import { AsyncStorage } from 'react-native';

export const ORDERS_KEY = '@key:orders'

// check if file exists on load
export async function saveOrderAsync(orderToSave) {
  let order = JSON.stringify(orderToSave)
  let prevOrders = await AsyncStorage.getItem(ORDERS_KEY)

  if(prevOrders != null) {
    prevOrders = JSON.parse(prevOrders)
  }

  prevOrders.push(order)

  await AsyncStorage.setItem(ORDERS_KEY, prevOrders)
}
