import './App.css';
import { useState } from "react";
import { cleanFruitBasket } from "../../shared/services/postHarvestHandling";

function App() {
    const [basket, setBasket] = useState('🍎🍂🍎🍂🍂🍏🍏🍏');
    return (
        <div className="App">
            <header className="App-header">
                <label htmlFor="basketFruits">Fruits' basket</label>
                <input
                    id="basketFruits"
                    value={basket}
                    onChange={(event) => {
                        setBasket(event.target.value);
                    }}
                />
                <button onClick={() => {
                    setBasket(cleanFruitBasket(basket));
                }}>
                    Clean basket
                </button>
                <button onClick={() => {
                    setBasket('');
                }}>
                    Sent to warehouse
                </button>
            </header>
        </div>
    );
}

export default App;
