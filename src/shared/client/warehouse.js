export async function packageFruitBasket(basket) {
    if (!basket) return Promise.reject(new Error('Basket is empty'));

    return await fetch('http://localhost:3001/warehouse/package', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ basket: basket })})
        .then(response => response.json())
        .catch(() => ({ status: 'failed' }));
}
