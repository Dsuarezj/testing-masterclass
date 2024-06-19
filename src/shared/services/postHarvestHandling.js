export function cleanFruitBasket(fruitBucket) {
  let fruitsToHarvest = /🍎|🍏/g;
  return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
}
