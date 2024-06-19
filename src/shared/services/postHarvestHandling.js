// should clean all the leaves from the fruit bucket
// and return the cleaned fruit bucket
export function cleanLeaves(basket) {
  if (!basket) return '';
  let fruitsToHarvest = /🍎|🍏/g;
  return basket?.match(fruitsToHarvest)?.join('')
}
