const SelectCoin = ({ coins, selectedCoin, handleChange }) => {
  return (
    <div className="bg-gray-100 border-solid border-2 border-gray-200 rounded-lg shadow-lg my-6">
      <div>
        <h2>Select a coin</h2>
      </div>
      <div>
        <select onChange={handleChange} value={selectedCoin.name}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.name}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <img className="w-8" src={selectedCoin.logo_url} alt="" />
      </div>
    </div>
  );
};

export default SelectCoin;
