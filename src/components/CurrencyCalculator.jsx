import React, { useEffect, useState } from "react";
import { fetchExchangeRates } from "../fetch_exchange_rates";
import "./CurrencyCalculator.css"; // Import the CSS file

const CurrencyCalculator = () => {
  const [banks, setBanks] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [bank, setBank] = useState("");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  useEffect(() => {
    const getExchangeRates = async () => {
      const data = await fetchExchangeRates();
      console.log("Fetched Rates:", data);
      setRates(data);
      setBanks(Object.keys(data));
    };

    getExchangeRates();
  }, []);

  useEffect(() => {
    if (bank && rates[bank]) {
      setAvailableCurrencies(Object.keys(rates[bank]));
      setFromCurrency(Object.keys(rates[bank])[0]);
    }
  }, [bank, rates]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleBankChange = (e) => {
    setBank(e.target.value);
  };

  const calculateResult = () => {
    if (rates[bank]) {
      const fromRate = rates[bank][fromCurrency]?.selling_rate;

      if (fromRate) {
        const convertedAmount = amount * fromRate;
        setResult(convertedAmount);
      } else {
        setResult(0);
      }
    } else {
      setResult(0);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Currency Exchange Calculator</h2>
      <div className="input-group">
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="input-group">
        <label>Select Bank:</label>
        <select value={bank} onChange={handleBankChange}>
          <option value="">Select Bank</option>
          {banks.map((bankName) => (
            <option key={bankName} value={bankName}>
              {bankName}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {availableCurrencies.map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
      </div>
      <button className="calculate-button" onClick={calculateResult}>
        Calculate
      </button>
      <div className="result">
        <label>Result in ETB:</label>
        <span>{result.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CurrencyCalculator;
