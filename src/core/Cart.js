import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Copyright from './Copyright';
import "./Home.css";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <>
        <h2 className='cart-title-text cart-items-count-text'>Cart has {`${items.length}`} {items.length > 1 ? "items" : "item"}</h2>
        <div className='cart-page-equipments-card-container'>
          {items.map((product, i) => (
            <div>
              <Card
                key={i}
                product={product}
                path='/cart'
                search={true}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  const noItemsMessage = () => (
    <>
      <h2 className='cart-title-text cart-empty-text'>
        Cart is Empty.
      </h2>
      <Link to='/rent'>
        <button className='continue-renting-btn'>
          Continue Renting
        </button>
      </Link>
    </>
  );

  return (
    <Layout
      title='Add, remove & checkout equipments.'
      path='/cart'
    >
      <section id='cart-page-content'>
        <div className='cart-page-cards-content'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='cart-summary-content'>
          <h2 className='cart-title-text cart-summary-text'>Cart Summary</h2>
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </section>
      <Copyright />
    </Layout>
  );
};

export default Cart;
