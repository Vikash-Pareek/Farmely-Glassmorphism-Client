import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import "./Card.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { addItem, updateItem, removeItem } from './cartHelpers';


const Card = ({
  product,
  path,
  search = true,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <a href={`/product/${product._id}`}>
          <button className='cards-btn view-btn-style'>
            <VisibilityIcon />
            View Equipment
          </button>
        </a>
      )
    );
  };

  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton, quantity) => {
    return (
      (showAddToCartButton && quantity > 0) && (
        <button onClick={addToCart} className='cards-btn cart-btn-style'>
          <ShoppingCartIcon />
          Add To Cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='in-stock-text'>In Stock</span>
    ) : (
      <span className='out-of-stock-text'>Out of Stock</span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='cart-quantity-container'>
          <div className='quantity-field-group'>
            <label>Adjust Quantity:</label>
            <input type='number' className='quantity-input' value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }} className='cards-btn remove-btn-style'>
          <DeleteIcon />
          Remove Equipment
        </button>
      )
    );
  };


  return (
    <section className='equipments-card'>
      {shouldRedirect(redirect)}
      <ShowImage item={product} url='product' />
      <div>
        <span>{showStock(product.quantity)}</span>
        <p className='equipment-name'>{product.name}</p>
        {
          path === '/' ? null
            : path === '/rent' ? null
              : path === '/cart' ? null
                : search ? null
                  : (
                    <>
                      <p className='equipment-description'>{product.description.substring(0, 100)}</p>
                    </>
                  )
        }
        <p className='equipment-details'>Rent (Per Day):  <span className='equipment-description'>₹{product.price}</span></p>
        {
          path === '/' ? null
            : path === '/rent' ? null
              : path === '/cart' ? null
                : search ? null
                  : (
                    <>
                      <p className='equipment-details'>
                        Brand: <span className='equipment-description'>{product.category && product.category.name}</span>
                      </p>
                      <p className='equipment-description equipment-added-time'>
                        Added {moment(product.createdAt).fromNow()}
                      </p>
                    </>
                  )
        }
        <div className='equipment-cards-btn-container'>
          {showViewButton(showViewProductButton)}
          {showAddToCartBtn(showAddToCartButton, product.quantity)}
          {showRemoveButton(showRemoveProductButton)}
        </div>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </section>
  );
};

export default Card;
