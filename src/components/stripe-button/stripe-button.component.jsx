import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const pushlishableKey = 'pk_test_MjAgFKd3ykLf382peEnDoIYu';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is: $${price}`}
            amout={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={pushlishableKey}
        />
    )

}

export default StripeCheckoutButton;