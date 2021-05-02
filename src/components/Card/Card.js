import React from 'react';
import Cards from 'react-credit-cards'

const CardImage = (props) => {
    return (
        <div className="card-container">
            <Cards {...props} />
        </div>
    );
};

export default CardImage;