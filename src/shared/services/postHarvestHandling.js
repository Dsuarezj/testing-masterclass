import {packageFruitBasket} from "../client/warehouse";

export const cleanFruitBasket = (fruitBucket) => {
    let fruitsToHarvest = /🍎|🍏/g;
    return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
}

export const sentToWarehouse = async (basket) => {
    try {
        return await packageFruitBasket(basket);
    } catch (e) {
        return { status: 'error', message: e.message };
    }
}
