import React from 'react';
import { Col, Row } from 'reactstrap';
import SuccessImage from '../utils/success.png'

const PaymentSuccessful = ({ navigate }) => {
    return (
        <Col>
            <Row className="centre">
                <img 
                   src={SuccessImage} 
                   alt="success"
                   className="success"
                />
            </Row>
            <br />
            <Row className="centre">
                <h5>Payment completed</h5>
            </Row>
            <br />
            <br />
            <Row className="centre">
                <p onClick={()=>navigate(1)} className="navigator">&#x02190; Back to home</p>
            </Row>
        </Col>
    );
};

export default PaymentSuccessful;