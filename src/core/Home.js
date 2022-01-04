import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import 'fontsource-roboto';
import Copyright from './Copyright';
import loadingSpinner from '../assets/loading-tractor.gif';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(error);
        setProductsBySell(data);
      }
      setLoading(false);
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title='Choose from variety of farming equipments.' path='/'>
      {
        loading ?
          (
            <div className='loading-container'>
              <img src={loadingSpinner} alt='Loading...' />
              <h1>Loading...</h1>
            </div>
          ) : (
            <>
              <section className='page-scroll-icon-container arrow-down-icon-container'>
                <a href='#cards-content'>
                  <button>
                    <KeyboardDoubleArrowDownIcon fontSize='large' />
                  </button>
                </a>
              </section>

              <main id='cards-content'>
                <h2 className='cards-container-title-one'>New Arrivals</h2>
                <div className='equipments-card-container new-arrival-container-bg'>
                  {productsByArrival.map((product, i) => (
                    <div key={i}>
                      <Card product={product} path="/" search={true} />
                    </div>
                  ))}
                </div>

                <h2 className='cards-container-title-two'>Best Sellers</h2>
                <div className='equipments-card-container best-seller-container-bg'>
                  {productsBySell.map((product, i) => (
                    <div key={i}>
                      <Card product={product} path="/" search={true} />
                    </div>
                  ))}
                </div>
              </main>

              <section className='page-scroll-icon-container'>
                <a href='#cards-content'>
                  <button>
                    <KeyboardDoubleArrowUpIcon fontSize='large' />
                  </button>
                </a>
              </section>
              <Copyright />
            </>
          )
      }
    </Layout>
  );
};

export default Home;
