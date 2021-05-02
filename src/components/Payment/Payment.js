import React, { useState, useEffect, useCallback } from 'react';
import { Col } from 'reactstrap'
import CardForm from '../Card/CardForm';
import { findCurrentLocation, getCountriesWithCurrencies } from '../utils/api';
import FirstPaymentForm from './FirstPaymentForm';
import PaymentChanels from './PaymentChanels';
import PaymentSuccessful from './PaymentSuccessful';


const Payment = () => {
    const [ country, setCountry ] = useState("")
    const [ countriesList, setCountriesList ] = useState(null)
    const [ amount, setAmount ] = useState("");
    const [ currency, setCurrency ] = useState("**")
    const [ openPaymentChanels, setOpenPaymentChanels ] = useState(false)
    const [ disableButton, setDisableButton ] = useState(true)
    const [ chanels, setChanels ] = useState([])
    const [ selectedChanel, setSelectedChanel ] = useState("")
    const [page, setPage ] = useState(1)

    const homeRefresh = () => {
        setAmount("");
        setOpenPaymentChanels(false);
        setDisableButton(true);
        setChanels([]);
        setSelectedChanel("")
    }
    useEffect(() => {
        const finder = () => {
            findCurrentLocation()
            .then(res => {setCountry(res.data.country); getCountries()})
            .catch(({data, status})=> {
                console.log(data)
            })
        }; 
        finder()
    }, [])
    
    const fillCurrency = useCallback(
        () => {
            if(countriesList && countriesList.data && countriesList.data.length && country !== "Select country"){
                const selectedCountry = countriesList.data.filter(_country => _country.name === country);
                setCurrency(selectedCountry[0].currency);
            } else { setCurrency("**")}
        }, [country, countriesList]
    )
    useEffect(() => {
        fillCurrency();
    }, [fillCurrency, country]);
    
    const enableNextSection = (amount) => {
        let enable = false
        if(country && amount) {
            let amountValue = amount.split(" ").pop();
            amountValue = amountValue.replace(/\D/g,'')
            if(amountValue > 0) {
                enable = true;
                return enable
            };
        }
        return enable
    }
    const getCountries = () => {
        getCountriesWithCurrencies()
        .then(res => setCountriesList(res.data))
        .catch(({data, status})=> {
            console.log(data)
        })
    }
    const onChangeHandler = e => {
        formatCurrency(e, null, "onChange")
    }
    const onChangeCountry = e => {
        setCountry(e.target.value);
    }
    
    const formatNumber=(n)=> {
    // format number 1000000 to 1,234,567
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    const formatCurrency = (e, blur, onChange) => {
    
    // appends appropriate currency to value, validates decimal side
    // and puts cursor back in right position.
    
    // get input value
    let input_val = e.target.value
    
    // don't validate empty input
    if (input_val === "") { return; }
    
    // original length
    let original_len = input_val.length;
    
    // initial caret position 
    let caret_pos = e.target.selectionStart;
        
    // check for decimal
    if (input_val.indexOf(".") >= 0) {
    
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        let decimal_pos = input_val.indexOf(".");
    
        // split number by decimal point
        let left_side = input_val.substring(0, decimal_pos);
        let right_side = input_val.substring(decimal_pos);
    
        // add commas to left side of number
        left_side = formatNumber(left_side);
    
        // validate right side
        right_side = formatNumber(right_side);
        
        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
        right_side += "00";
        }
        
        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);
    
        // join number by . and currency
        input_val = left_side + "." + right_side;
    
    } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        
        // final formatting
        if (blur === "blur") {
            input_val += ".00";
        }
    }
    
    // send updated string to input
    // input.val(input_val);
    e.target.value = input_val
    
    // put caret back in the right position
    const updated_len = input_val.length;
    caret_pos = updated_len - original_len + caret_pos;
    e.target.setSelectionRange(caret_pos, caret_pos);
        if(onChange && onChange === "onChange") {
            setAmount(e.target.value);
            const enableButton = enableNextSection(e.target.value);
            if(enableButton){
                setDisableButton(false);
            } else {
                setOpenPaymentChanels(false);
                setDisableButton(true);
            }
        }
    }
    const enablePaymentChanels = () => setOpenPaymentChanels(true)
    
    return (
        <Col>
            <Col sm="12" md={{ size: 4, offset: 4 }} className="widget">
                {
                    page === 1 &&
                    <FirstPaymentForm 
                        countriesList={countriesList}
                        onChangeHandler={onChangeHandler}
                        onChangeCountry={onChangeCountry}
                        country={country} 
                        formatCurrency={formatCurrency}
                        currency={currency} 
                        disableButton={disableButton}
                        enablePaymentChanels={enablePaymentChanels} 
                        chanels={chanels}
                        setChanels={setChanels}
                        amount={amount}
                        setPage={setPage}
                        openPaymentChanels={openPaymentChanels} 
                        setSelectedChanel={setSelectedChanel} 
                        selectedChanel={selectedChanel}
                    />
                }
                {
                    page === 2 &&
                    <Col>
                        <PaymentChanels
                            chanels={chanels}
                            country={country}
                            setChanels={setChanels}
                            openPaymentChanels={openPaymentChanels}
                            selectChanel={setSelectedChanel}
                            selectedChanel={selectedChanel}
                            navigate={setPage}
                        />
                    <br />
                </Col> 
                }
                {
                    page === 3 &&
                    <CardForm amount={amount} navigate={setPage} handleHomeReset={homeRefresh} currency={currency} />
                }
                {
                    page === 4 && 
                    <PaymentSuccessful navigate={setPage} />
                }
            </Col>
        </Col>
    );
};

export default Payment;