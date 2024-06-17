import { packageFruitBasket } from "./warehouse";

global.fetch = vi.fn();
let basket = '🍎🍎🍏';

beforeEach(() => {
    fetch.mockClear();
});

it('should call the correct URL with a fruit of basket', () => {
    packageFruitBasket(basket);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })
    });
})

it('should  return ok if the basket was receive correctly', async () => {
    let expectedResponse = { status: 'received' };
    fetch.mockResolvedValue({
        json: () => Promise.resolve(expectedResponse)});

    const response = await packageFruitBasket(basket);

    expect(response).toEqual(expectedResponse);
});

it('should return an error the api is down', async () => {
    fetch.mockRejectedValue('API is down');

    const response = await packageFruitBasket(basket);

    expect(response).toEqual({ status: 'failed' });
});

it('should throw an error when basket was not provide', async () => {
    let basket = null;
    await expect(packageFruitBasket(basket)).rejects.toThrow('Basket is empty');
});
