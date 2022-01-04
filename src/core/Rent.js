import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import Copyright from './Copyright';
import "./Rent.css";


const Rent = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(error);
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        setLimit(6);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className='load-more-btn'>
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title='Search and find equipments.'
      path='/rent'
    >
      <main id='rent-page-content'>
        <div className='filters-container'>
          <div className='filter-categories-container'>
            <h2>Filters</h2>
            <div className='brand-filter-container'>
              <h4>By Brand</h4>
              <ul>
                <Checkbox
                  categories={categories}
                  handleFilters={(filters) => handleFilters(filters, 'category')}
                />
              </ul>
            </div>

            <div className='price-filter-container'>
              <h4>By Price</h4>
              <div className='radiobox-container'>
                <RadioBox
                  prices={prices}
                  handleFilters={(filters) => handleFilters(filters, 'price')}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className='rent-page-cards-content'>
            <h2 className='rent-title-text'>Equipments</h2>
            <div className='rent-page-equipments-card-container'>
              {filteredResults.map((product, i) => (
                <div key={i}>
                  <Card product={product} path="/rent" search={true} />
                </div>
              ))}
            </div>
            {loadMoreButton()}
          </div>
        ) : (
          <div className='no-equipments-container'>
            <h1>No equipments found for the filters applied!</h1>
          </div>
        )
        }
      </main>
      <Copyright />
    </Layout>
  );
};

export default Rent;
