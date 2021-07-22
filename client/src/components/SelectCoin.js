const SelectCoin = ({ coins, selectedCoin, handleChange }) => {
  return (
    <div className="bg-gray-100 border-solid border-2 border-gray-200 rounded-lg shadow-lg my-6">
      <div className="flex justify-center">
        <div className="m-2">
          <img className="w-8" style={{ height: "32px" }} src={selectedCoin.logo_url} alt="" />
        </div>
        <div>
          <select className="p-2 m-2 rounded-lg" onChange={handleChange} value={selectedCoin.name}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectCoin;
