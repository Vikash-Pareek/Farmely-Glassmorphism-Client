import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import Copyright from "./Copyright.js";
import "./Product.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(error);
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <Layout
      title={product && product.name}
    >
      <main id='view-equipments-content'>
        <h2 className='product-page-text'>Equipment Details</h2>
        <div className='equipment-details-container'>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} search={false} />
          )}
        </div>

        <h2 className='product-page-text related-equipments-text'>Related Equipments</h2>
        <div className='related-equipments-container'>
          {relatedProduct.map((p, i) => (
            <div key={i}>
              <Card product={p} search={false} />
            </div>
          ))}
        </div>
      </main>
      <Copyright />
    </Layout>
  );
};

export default Product;
