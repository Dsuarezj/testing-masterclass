import { cleanFruitBasket } from "./postHarvestHandling";

it('should collect only red and green apples and clean all the leaves or extra dirt', () => {
    const otherDirt = Math.random().toString(36);
    expect(cleanFruitBasket('🍎🍂🍎🍂🍀' + otherDirt + '🍏')).toEqual('🍎🍎🍏');
});

it('should return an empty if no basket is provided', () => {
    expect(cleanFruitBasket()).toEqual('');
});
