import './App.css';
import {useState} from "react";
import {cleanFruitBasket, sentToWarehouse} from "../../shared/services/postHarvestHandling";

function App() {

    const [harvestFruits, setHarvestFruits] = useState('🍎🍂🍎🍂A🍏');

    return (
        <div className="App">
            <header className="App-header">
                <label htmlFor="basketFruits">Basket Fruits</label>
                <input id="basketFruits" value={harvestFruits} onChange={(e) => setHarvestFruits(e.target.value)}/>
                <button onClick={() => {
                    setHarvestFruits(cleanFruitBasket(harvestFruits));
                }}>
                    Clean basket
                </button>

                <button onClick={async () => {
                    await sentToWarehouse(harvestFruits);
                    setHarvestFruits('');
                }}>
                    Sent to warehouse
                </button>
            </header>
        </div>
    );
}

export default App;
