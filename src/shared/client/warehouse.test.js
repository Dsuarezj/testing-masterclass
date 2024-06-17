import { packageFruitBasket } from "./warehouse";

global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

it('should call the correct URL with a fruit of basket', () => {
    let basket = '🍎🍎🍏';
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
    let basket = '🍎🍎🍏';
    let expectedResponse = { status: 'received' };
    fetch.mockImplementationOnce(() =>
        Promise.resolve({
            json:
                () => Promise.resolve(expectedResponse),
        }));

    const response = await packageFruitBasket(basket);

    expect(response).toEqual(expectedResponse);
});

it('should return an error the api is down', async () => {
    let basket = '🍎🍎🍏';
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    const response = await packageFruitBasket(basket);

    expect(response).toEqual({ status: 'failed' });
});

it('should throw an error when basket was not provide', async () => {
    let basket = null;
    await expect(packageFruitBasket(basket)).rejects.toThrow('Basket is empty');
});
