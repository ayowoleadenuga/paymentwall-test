import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap'

const FirstPaymentForm = (props) => {
    const {
        countriesList, onChangeHandler, onChangeCountry, 
        country, formatCurrency, currency, disableButton, 
        enablePaymentChanels, amount, setPage
    } = props
    return (
        <>
            <br />
            <h1>Make payment</h1>
            <br />
            <Form autoComplete="off">
                <Row>
                    <Col sm="4">
                    <FormGroup>
                        <Label for="country">Select country</Label>
                        <Input type="select" name="country" onChange={onChangeCountry} value={country}>
                            <option>Select country</option>
                            {
                                countriesList && countriesList.data ?
                                countriesList.data.map(_country => (
                                    <option key={_country.name} id={_country.countryCode}>{_country.name}</option>
                                )) : ""
                            }
                        </Input>
                    </FormGroup>  
                    </Col>
                    <Col sm="8">
                        <FormGroup>
                            <Label for="currency-field">{`Amount in (${currency})`}</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    {currency}
                                </InputGroupAddon>
                                <Input 
                                    onKeyUp={e => formatCurrency(e)}
                                    onBlur={e => formatCurrency(e, "blur")}
                                    type="text" 
                                    name="currency-field" 
                                    autoComplete="false"
                                    id="currency-field" 
                                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" 
                                    value={amount}
                                    data-type="currency" 
                                    placeholder="1,000,000.00"
                                    onChange={onChangeHandler}
                                /> 
                                </InputGroup>
                        </FormGroup> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button 
                            type="button" 
                            className="block" 
                            disabled={disableButton}
                            onClick={()=>{enablePaymentChanels(); setPage(2)}}
                        >Next
                        </Button>
                    </Col>   
                </Row>
            </Form>
            <br />
        </>
    );
};

export default FirstPaymentForm;