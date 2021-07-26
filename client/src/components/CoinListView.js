import { useEffect } from "react";

const CoinListView = ({ coins, selectedCoin }) => {
  const coinValueAtX = (coin, selectedCoin) => {
    const coinMC = Number(coin.market_cap);
    const selectedCoinMC = Number(selectedCoin.market_cap);
    const selectedCoinPrice = Number(selectedCoin.price);
    const potentialPrice = (coinMC / selectedCoinMC) * selectedCoinPrice;
    const formattedPotentialPrice = potentialPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "USD",
    });

    return formattedPotentialPrice;
  };

  const potentialUpside = (coin, selectedCoin) => {
    const coinMC = Number(coin.market_cap);
    const selectedCoinMC = Number(selectedCoin.market_cap);
    const selectedCoinPrice = Number(selectedCoin.price);
    const potentialPrice = (coinMC / selectedCoinMC) * selectedCoinPrice;
    const multiplier = (potentialPrice - selectedCoinPrice) / selectedCoin.price;

    if (multiplier < 10) {
      return Math.round(multiplier * 100).toFixed(2) + "%";
    } else {
      return Math.round(multiplier) + "x";
    }
  };

  const nFormatter = (mcap) => {
    const num = Number(mcap);
    if (num >= 1000000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "T";
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  useEffect(() => {
    const changeUpsideColor = () => {
      const values = document.querySelectorAll(".upside");
      values.forEach((value) => {
        if (Number(value.innerText.substring(0, value.innerText.length - 1)) < 0) {
          value.style.color = "red";
        } else {
          value.style.color = "green";
        }
      });
    };

    changeUpsideColor();
  });

  return (
    <div>
      {coins.map((coin) => (
        <div key={coin.id} className="flex border-solid border-2 border-gray-200 rounded-lg shadow-lg mb-6">
          <div className="flex flex-row lg:w-1/2 justify-between p-4">
            <div className="flex">
              <div className="flex justify-center items-center">
                <div className="text-3xl text-gray-500 p-3 w-12">{coin.rank}</div>
              </div>
              <div className="flex justify-center items-center p-3">
                <img className="w-10" style={{ height: "40px" }} src={coin.logo_url} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <div className="text-gray-500 font-semibold">{coin.id}</div>
                  <div className="text-lg font-semibold">{coin.name}</div>
                </div>
              </div>
            </div>
            <div className="text-3xl font-semibold m-5 flex justify-center items-center">
              <div>{"$" + nFormatter(coin.market_cap)}</div>
            </div>
          </div>

          {/* Coin comparison half */}

          <div className="flex lg:w-1/2 flex-row p-4 justify-between bg-gray-50">
            <div className="flex justify-center items-center w-1/3">
              <div className="flex flex-row">
                <div className="p-2">
                  <img style={{ height: "38px" }} src={selectedCoin.logo_url} alt="" />
                </div>
                <div className="flex justify-center items-center flex-col">
                  <div>
                    <div className="text-sm text-gray-500">{selectedCoin.id}</div>
                    <div className="font-semibold">{selectedCoin.name}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-3/5">
              <div className="flex flex-row justify-between">
                <div className="text-gray-500 text-sm">Current {selectedCoin.id} Price</div>
                <div className="font-proxima">
                  {Number(selectedCoin.price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>
              <div className="flex flex-row justify-between py-2">
                <div className="text-gray-500 text-sm">Potential Price</div>
                <div className="font-semibold font-proxima">{coinValueAtX(coin, selectedCoin)}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-gray-500 text-sm">Potential Upside</div>
                <div className="font-semibold upside font-proxima">{potentialUpside(coin, selectedCoin)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinListView;
