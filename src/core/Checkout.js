import React, { useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from './apiCore';
import { emptyCart } from './cartHelpers';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import "./Cart.css";


const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='checkout-btns'>
          Signin to Checkout
        </button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    data.instance
      .requestPaymentMethod()
      .then((data) => {
        let nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log('payment success and empty cart');
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && products.length > 0 ? (
        <>
          <div className='address-form-container'>
            <label className='address-label'>Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className='address-input'
              value={data.address}
              placeholder='Type Delivery Address Here.....'
              rows={4}
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='checkout-btns pay-btn'>
            Pay
          </button>
        </>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <h1
      className='payment-error-text'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </h1>
  );

  const showSuccess = (success) => (
    <h1
      className='payment-success-text'
      style={{ display: success ? '' : 'none' }}
    >
      Thanks! Your Payment was Successful!
    </h1>
  );

  const showLoading = (loading) =>
    loading && <h2 className='loading-text'>Loading...</h2>;

  return (
    <div className='cart-checkout-content'>
      <h2 className='cart-total-text'>Cart Total: <span className='cart-total-amount'>₹{getTotal()}</span></h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
