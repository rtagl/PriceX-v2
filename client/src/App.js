import { useEffect, useState } from "react";
import SelectCoin from "./components/SelectCoin";
import CoinListView from "./components/CoinListView";
import axios from "axios";

const url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_NOMIC_KEY}`;

const App = () => {
  const [coins, setCoins] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.get(url);
      await setCoins(response.data.slice(0, 21));
      await setSelectedCoin(response.data[Math.floor(Math.random() * (10 - 1) + 1)]);
    }

    fetchMyAPI();
  }, []);

  console.log(selectedCoin);

  const handleSelectChange = (e) => {
    const coinName = e.target.value;
    setSelectedCoin(coins.find((coin) => coin.name === coinName));
  };

  return (
    <div className="container max-w-5xl mx-auto px-8">
      {coins ? (
        <div>
          <div>
            <SelectCoin coins={coins} selectedCoin={selectedCoin} handleChange={handleSelectChange} />
          </div>
          <div>
            <CoinListView coins={coins} selectedCoin={selectedCoin} />
          </div>
        </div>
      ) : (
        <div
          wireloading="true"
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-gray text-xl font-semibold">Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default App;
