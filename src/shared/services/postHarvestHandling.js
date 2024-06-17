import {packageFruitBasket} from "../client/warehouse";

export const cleanFruitBasket = (fruitBucket) => {
    let fruitsToHarvest = /🍎|🍏/g;
    return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
}

export const sentToWarehouse = async (basket) => {
    try {
        let response = await packageFruitBasket(basket);
        return { status: response.status, message: 'Basket received' };
    } catch (e) {
        return { status: 'error', message: e.message };
    }
}
