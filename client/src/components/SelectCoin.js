const SelectCoin = ({ coins, selectedCoin, handleChange }) => {
  return (
    <div className="bg-gray-100 border-solid border-2 border-gray-200 rounded-lg shadow-lg my-2">
      <div>
        <h2>Select a coin</h2>
      </div>
      <div>
        <select onChange={handleChange}>
          <option>Select A Coin</option>
          {coins ? coins.map((coin) => <option key={coin.id}>{coin.name}</option>) : null}
        </select>
      </div>
      <div>{selectedCoin ? <img className="w-8" src={selectedCoin.logo_url} alt="" /> : null}</div>
    </div>
  );
};

export default SelectCoin;
