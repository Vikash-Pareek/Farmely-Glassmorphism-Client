import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';
import "./Search.css";
import CloseIcon from '@mui/icons-material/Close';


const Search = () => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  const searchBoxClose = () => {
    setSearchBoxOpen(!searchBoxOpen);
  };

  const [data, setData] = useState({
    categories: [],
    category: "",
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    } else {
      return null;
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return (
        <h2 className='search-message-text success'>{results.length} {results.length > 1 ? 'Equipments' : 'Equipment'} Found!</h2>
      );
    }
    if (searched && results.length < 1) {
      return (
        <h2 className='search-message-text not-found'>No Equipments Found!</h2>
      );
    }
    if (!searched) {
      return (
        <h2 className='search-message-text not-searched'>Please type equipment name in the search bar!</h2>
      );
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <>
        {searchMessage(searched, results)}
        <div className='search-equipments-card-container'>
          {results.map((product, i) => (
            <div key={i}>
              <Card product={product} search={true} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit} className='search-container'>
      <select onChange={handleChange('category')} className='select-brand'>
        <option value=''>
          Select Brand
        </option>
        <option value='All'>
          All
        </option>
        {categories.map((c, i) => (
          <option key={i} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input onChange={handleChange('search')} placeholder="Search By Equipment" className='search-input' />

      <button type='submit' className='search-btn' onClick={searchBoxClose}>
        Search
      </button>
    </form>
  );

  return (
    <>
      {searchForm()}
      {
        searchBoxOpen ? (
          <div className='search-result-container'>
            <button className='search-container-close-btn' onClick={searchBoxClose}>
              <CloseIcon fontSize='large' />
              <h2>Close</h2>
            </button>
            {searchedProducts(results)}
          </div>
        ) : null
      }
    </>
  );
};

export default Search;
