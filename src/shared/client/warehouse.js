export async function packageFruitBasket(basket) {
    if (!basket) throw new Error('Basket is empty');
    try {
        const result = await fetch('http://localhost:3001/warehouse/package', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({basket: basket})
        });

        return await result.json();
    } catch (e) {
        return {status: 'failed'};
    }
}
