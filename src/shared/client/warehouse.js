export const packageFruitBasket = async (basket) => {
    if (!basket) {
        throw new Error('Basket is empty');
    }
    try {
        return await fetch('http://localhost:3001/warehouse/package', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ basket: basket })
        }).then((res) => res.json());
    } catch (e) {
        return { status: 'failed' };
    }
};
