import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'reactstrap';
import { getPaymentMethods } from '../utils/api';

const PaymentChanels = ({ chanels, setChanels, country, openPaymentChanels, selectChanel, selectedChanel, navigate }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getPaymentChanels = () => {
            setError(null)
            setLoading(true)
            getPaymentMethods(country)
            .then(res =>{
                setLoading(false)
                if(res.data) return setChanels(res.data);
                else {
                    setError({ error: "not found"})
                }
            })
            .catch(( {response} ) => {setLoading(false); setError(response.data)})
        };
        getPaymentChanels()
        return () => {
            setChanels([]);
        }
    }, [country, setChanels])
    const enableButton = () => {
        if(chanels.length && selectedChanel) {
            const check = chanels.filter(_chanel => selectedChanel === _chanel.name);
            return check.length ? true : false    
        }
        
    }
    const openButton = enableButton();
    return (
        <>
        <br />
        
            {    openPaymentChanels ?
            <>
                <Row className="centre">
                    <h5>Select payment method</h5>
                </Row>
                <Row className="centre">
                    {
                        loading && <p className="loadingText">{`Loading payment options for ${country}...`}</p>
                    }
                    {
                        error && error.error ?
                        <Alert color="danger">{`Oops! Unable to find payment options for ${country}`}</Alert> : ""
                    }
                </Row>
                <Row className="payment-method_row">
                    <ul className="chanels">
                        {
                            chanels.length ?
                            chanels.map(chanel =>(
                                <li 
                                    key={chanel.id} 
                                    className={`chanel ${selectedChanel === chanel.name ? "selected" : ""}`}
                                    style={{
                                        backgroundImage: `url(${chanel.img_url})`
                                    }}
                                    onClick={()=>selectChanel(chanel.name)}
                                >
                                    <h6>{chanel.name}</h6>
                                </li>
                            )) : ""
                        }
                    </ul>
                </Row>
                <br />
                <Row>
                    <Col sm="6">
                            <Button 
                                type="button" 
                                className="block" 
                                disabled={!openButton}
                                onClick={()=>navigate(3)}
                            >Next
                            </Button>
                    </Col> 
                    <Col sm="6">
                        <Button 
                            type="button" 
                            className="block" 
                            style={{backgroundColor: "red"}}
                            onClick={()=>navigate(1)}
                        >Back
                        </Button>
                    </Col>   
                </Row>
                </> : ""
            }
        </>
    );
};

export default PaymentChanels;