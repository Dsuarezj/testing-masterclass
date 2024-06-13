import { cleanFruitBasket } from "./postHarvestHandling";

it('should collect only red and green apples', () => {
    expect(cleanFruitBasket('🍎🍂🍎🍂A🍏')).toEqual('🍎🍎🍏');
});

it('should clean all the sheets present', () => {
    expect(cleanFruitBasket('🍎🍂🍎🍂🍂🍂🍎')).toEqual('🍎🍎🍎');
});


it('should clean all the things that are not fruits', () => {
    expect(cleanFruitBasket('🍎🍂🍎🍂A🍎')).toEqual('🍎🍎🍎');
});

it('should return empty basket when no argument was pass', () => {
    expect(cleanFruitBasket()).toEqual('');
});


