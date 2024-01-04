import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((response) => {
        const rates = response.data.rates;
        setCurrencies([response.data.base, ...Object.keys(rates)]);
        setExchangeRate(rates[toCurrency]);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="currency-converter">
      <div className="blurbox"></div>
      <div className="currency-content">
      <h1>Convertisseur de devises</h1>
      <button className="swap-button" onClick={handleSwapCurrencies}>
          Swap
        </button>
      <div className="conversion-form">
        <input
          type="number"
          className="amount-input"
          value={amount}
          onChange={handleAmountChange}
        />
        <select
          className="currency-select"
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span className="equals">=</span>
        <input
          type="text"
          className="converted-amount"
          value={convertedAmount}
          readOnly
        />
        <select
          className="currency-select"
          value={toCurrency}
          onChange={handleToCurrencyChange}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <small>Par Edouardo Stevano RAZAFIMIADANA</small>
      </div>
      
    </div>
  );
}

export default CurrencyConverter;
