import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Col, Row, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import { formatCreditCardNumber, formatCVC, validateCardNumber } from './utils';
import "react-datepicker/dist/react-datepicker.css";
import CardImage from './Card';

const CardForm = ({ amount, navigate, handleHomeReset, currency }) => {
    const [ cardNumber, setCardNumber ] = useState("")
    const [ name, setName ] = useState("")
    const [ expiry, setExpiry ] = useState("")
    const [ cvv, setCvv ] = useState("")
    const [ cardExpiry, setCardExpiry ] = useState("")

    const cardNumberChangeHandler = e => {
        let val = e.target.value;
        val = formatCreditCardNumber(val);
        setCardNumber(val.trim());
        e.target.value = val === " " ? val.trim() : val
    }
    const onNameChange = e => {
        let val = e.target.value
        setName(val)
    }
    const isCardValid = () => {
        if(cardNumber.length){
            return validateCardNumber(cardNumber)
        }
        return false;
    }
    const enableButton = () => {
        return (cardNumber.length >= 16 || 
        cardNumber <= 22) && name.length > 1 && 
        cardExpiry.length === 7 && 
        cvv.length === 3 ? 
        false : true 
    }
    const onDateChange = (val) => {
        if(val === "" || val === null) return
        let date = new Date(val);
        date = val.getMonth()+1;
        if(date < 10) date = `0${date}`
        const year = val.getFullYear();
        setCardExpiry(`${date}/${year}`);
        setExpiry(val);

    }
    const onCvvChange = e => {
        let val = e.target.value;
        val = formatCVC(val);
        setCvv(val)
    }
    const handleReset = () => {
        setCardExpiry("");
        setExpiry("");
        setCardNumber("");
        setName("");
        setCvv("");
    }
    
    const testCardNumber = isCardValid();
    
    const showButton = enableButton();
    const handleSubmit = () => {
        handleHomeReset()
        navigate(4);
        handleReset();
    }
    return (
        <Col>

                <br />
                <Row>
                    <Col sm="12" md="12" className="centre">
                        <h5>Enter payment card details</h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <CardImage 
                            number={cardNumber || ''}
                            name={name || ''}
                            expiry={cardExpiry || ''}
                            cvc={cvv|| ''}
                        />
                    </Col>
                    <Col sm="12">
                        <Form>
                            <br />
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="cardNumber">Card Number</Label>
                                        <Input 
                                            onChange={cardNumberChangeHandler}
                                            value={cardNumber}
                                            type="text"
                                            name="cardNumber"
                                            pattern="[\d| ]{16,22}"
                                            placeholder="Card Number"
                                            valid={testCardNumber}
                                        />
                                        {!testCardNumber && /[\d| ]{12,22}/.test(cardNumber) ? <FormText color="danger">**Invalid card number</FormText> : ""}
                                    </FormGroup>  
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="cardName">Card Holder</Label>
                                        <Input 
                                            onChange={onNameChange}
                                            value={name}
                                            name="cardName"
                                            type="text"
                                            valid={name.length > 1}
                                            placeholder="Card holder's name"
                                        />
                                        {name !== "" && name.length < 2 && <FormText color="danger">**Invalid name</FormText>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6" md="6">
                                    <FormGroup>
                                        <Row>
                                            <Col>
                                            <Label for="expiryDate">Date</Label> 
                                            </Col>
                                           
                                        </Row>
                                        <DatePicker
                                            name="expiryDate"
                                            className={`${cardExpiry.length > 0 ? "date-selected" : ''}`}
                                            dateFormat="MM/yyyy"
                                            selected={expiry}
                                            onChange={onDateChange}
                                            minDate={new Date()}
                                            showMonthYearPicker
                                            placeholderText="Expiry date"
                                            showFullMonthYearPicker
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                <FormGroup>
                                    <Label for="cvv">Card Holder</Label>
                                        <Input
                                            onChange={onCvvChange}
                                            value={cvv}
                                            name="cvv"
                                            type="text"
                                            placeholder="cvv"
                                            maxLength={3}
                                            valid={cvv.length === 3}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col sm="6">
                                    <Button 
                                        className="block"
                                        disabled={showButton}
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        {`Pay ${currency}${amount}`}
                                    </Button>
                                </Col>
                                <Col sm="6">
                                    <Button 
                                        className="block"
                                        style={{backgroundColor: "red"}}
                                        type="button"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                        </Form>
                    </Col>
                </Row>
                <br />
                <Row className="centre">
                    <p onClick={()=>navigate(2)} className="navigator">&#x02190; Back to prev page</p>
                </Row>
        </Col>
    );
};

export default CardForm;