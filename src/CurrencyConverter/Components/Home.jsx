import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';



const Home = () => {

    const [exchangeRates, setExchangeRates] = useState({});

    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        // sign with https://app.exchangerate-api.com and get the api path
        // Fetch exchange rates from a free API

        
        const apiUrl = `https://v6.exchangerate-api.com/v6/e678489dc59f282bd2349544/latest/USD`;
        axios.get(apiUrl).then((res) => {
            setExchangeRates(res.data.conversion_rates);
        }).catch((err) => {
            console.log(err, 'error occurs');
        })
    }, [fromCurrency]);



    useEffect(() => {
        const conversionRate = exchangeRates[toCurrency];
        if (conversionRate) {
            const converted = amount * conversionRate;
            setConvertedAmount(converted.toFixed(2));
        }
    }, [amount, fromCurrency, toCurrency, exchangeRates[toCurrency]]);




    const handlechange = (eve) => {
        const { name, value } = eve.target;
        switch (name) {
            case 'amount':
                setAmount(value);
                break;
            case 'fromCurrency':
                setFromCurrency(value);
                break;
            case 'toCurrency':
                setToCurrency(value);
                break;
            default:
                break;
        }
    }


    return (
        <>
            <div className="card">
                <h3 className="text-6x1">Currency Converter</h3>
                <div className="currency_exchnage">
                    <div className="input_container">
                        <label htmlFor="" className='input_label'></label>
                        <input type="number" name="amount" onChange={handlechange} value={amount} className='input_field' />
                    </div>
                    <div className="input_container">
                        <label htmlFor="" className='input_label'>from Currency</label>
                        <select name="fromCurrency" onChange={handlechange} value={fromCurrency} className='input_field'>
                            {Object.keys(exchangeRates).map((currency) => (
                                <option value={currency} key={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input_container">
                        <label htmlFor="" className='input_label'>to Currency</label>
                        <select name="toCurrency" onChange={handlechange} value={toCurrency} className='input_field'>
                            {Object.keys(exchangeRates).map((currency) => (
                                <option value={currency} key={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="output">
                    <h2>Converted Amount : {convertedAmount}</h2>
                </div>
            </div>
        </>
    );
};

export default Home;