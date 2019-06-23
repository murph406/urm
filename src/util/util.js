export function composeEmail(itemGroup) {
  let message = ''
  message += itemGroup.brand + '\n'

  // itemGroup.items.forEach((item) => {
  //   message += 'URM Item Num:\t'
  //   message += item.urm_item_num
  //   message += '\n'
  //   message += 'Case UPC Num:\t'
  //   message += item.case_upc_name
  //   message += '\n'
  //   message += 'COUNT:\t'
  //   message += item.count
  // })
  return message
}

export function formatItemsForOrder(itemGroup) {
  let items = []
  itemGroup.items.forEach((item) => {
    items.push({
      'case_upc_num': item.case_upc_num,
      'urm_item_num': item.urm_item_num,
      'quantity': item.quantity
    })
  })
  return items
}
