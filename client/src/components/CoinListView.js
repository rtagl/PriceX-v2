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

    console.log(typeof formattedPotentialPrice, formattedPotentialPrice);
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
        <div key={coin.id} className="flex border-solid border-2 border-gray-200 rounded-lg shadow-lg my-6">
          <div className="flex flex-row w-1/2 justify-between bg-gray-100">
            <div className="flex flex-wrap content-around">
              <img className="w-12" style={{ height: "52px" }} src={coin.logo_url} alt="" />
              <div className="">
                <div className="text-gray-500 font-semibold">{coin.id}</div>
                <div className="text-lg font-semibold">{coin.name}</div>
              </div>
            </div>
            <div className="text-3xl font-semibold">{"$" + nFormatter(coin.market_cap)}</div>
          </div>
          <div className="flex flex-row w-1/2 justify-between">
            <div className="flex flex-wrap content-center m-auto">
              <div className="">
                <img className="w-11" style={{ height: "44" }} src={selectedCoin.logo_url} alt="" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{selectedCoin.id}</div>
                <div className="font-semibold">{selectedCoin.name}</div>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
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
              <div className="flex flex-row justify-between">
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
