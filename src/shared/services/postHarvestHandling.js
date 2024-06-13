export const cleanFruitBasket = (fruitBucket) => {
    let fruitsToHarvest = /🍎|🍏/g;
    return fruitBucket?.match(fruitsToHarvest)?.join('') || '';
}
