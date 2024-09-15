"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CurrencyConverterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const CurrencyConverterCard = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CurrencyConverterTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

const Result = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [conversionResult, setConversionResult] = useState<number | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const apiKey = '18181c2ce74a3299906f40cc';
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
      );
      setRates(response.data.conversion_rates);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (rates[toCurrency]) {
      const result = amount * rates[toCurrency];
      setConversionResult(result);
    } else {
      alert('Currency not found.');
    }
  };

  React.useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  return (
    <CurrencyConverterWrapper>
      <CurrencyConverterCard>
        <CurrencyConverterTitle>Currency Converter</CurrencyConverterTitle>
        <InputGroup>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
          />
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.keys(rates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
        </InputGroup>
        <Button onClick={handleConvert} disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </Button>
        {conversionResult !== null && (
          <Result>
            {amount} {fromCurrency} = {conversionResult.toFixed(2)} {toCurrency}
          </Result>
        )}
      </CurrencyConverterCard>
    </CurrencyConverterWrapper>
  );
};

export default CurrencyConverter;
