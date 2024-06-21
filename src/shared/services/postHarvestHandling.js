import {packageFruitBasket} from "../client/warehouse";

export function cleanFruitBasket(fruitBucket) {
  let fruitsToHarvest = /🍎|🍏/g;
  return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
}

export const sentToWarehouse = async (basket) => {
  let response = await packageFruitBasket(basket);
  return { "status": response.status, message: "Basket received"};
}
