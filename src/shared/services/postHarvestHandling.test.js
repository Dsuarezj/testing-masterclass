import { cleanLeaves } from "./postHarvestHandling";

it('should collect only red and green apples', () => {
    expect(cleanLeaves('🍎🍂🍎🍂🍏')).toEqual('🍎🍎🍏');
});

it('should return an empty basket if the basket is empty', () => {
    expect(cleanLeaves()).toEqual('');
});

it('should clean all the leaves or things that are not apples', () => {
    expect(cleanLeaves('🍎🍂🍎🍂🍀A🍎')).toEqual('🍎🍎🍎');
});
