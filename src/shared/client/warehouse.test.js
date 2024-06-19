import { packageFruitBasket } from "./warehouse";

global.fetch = jest.fn();

beforeEach(() => {
    fetch.mockClear();
});

it('should  return ok if the basket was receive correctly', async () => {
    let basket = '🍎🍎🍏';
    let expectedResponse = { status: 'received' };
    fetch.mockResolvedValue({
        json: () => Promise.resolve(expectedResponse)
    });


    const response = await packageFruitBasket(basket);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })
    });
    expect(response).toEqual(expectedResponse);
});

it('should return an error when the api is down', async () => {
    let basket = '🍎🍎🍏';
    fetch.mockRejectedValueOnce('API is down');

    const response = await packageFruitBasket(basket);

    expect(response).toEqual({ status: 'failed' });
});

it('should not make the request if the basket is empty and throw an error' , async () => {
    let basket = null;
    await expect(packageFruitBasket(basket)).rejects.toThrow('Basket is empty');
});
