import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signin, authenticate, isAuthenticated } from '../auth';
import Copyright from '../core/Copyright';
import "./UserAuth.css";


export default function Signin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <h2
      className='auth-error-text'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </h2>
  );

  const showLoading = () =>
    loading && (
      <div className='loading-text'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />;
    }
  };

  const signInForm = () => (
    <div className='user-auth-form-container'>
      <div className='user-auth-icon'>
        <LockOutlinedIcon fontSize='large' />
      </div>
      <h1>Signin</h1>
      <form className='user-auth-form'>
        <div className='form-field-container'>
          <label for='email'>Email<span>*</span></label>
          <input id='email' name='email' placeholder='Enter Email' autoComplete='email' onChange={handleChange('email')}
            type='email' value={email} required />
        </div>
        <div className='form-field-container'>
          <label for='password'>Password<span>*</span></label>
          <input name='password' placeholder='Enter Password' type='password' id='password' onChange={handleChange('password')}
            value={password} autoComplete='current-password' required />
        </div>
        <button onClick={clickSubmit} type='submit' className='user-auth-form-btn'>
          Signin
        </button>
      </form>
      <Link to='/signup'>
        <p className='form-link-text'>Don't have an account? Signup</p>
      </Link>
    </div>
  );

  return (
    <Layout title='Enter to the world of FARMERLY.' path='/signin'>
      <section id='user-auth-container'>
        {showError()}
        {showLoading()}
        {redirectUser()}
        {signInForm()}
      </section>
      <Copyright />
    </Layout>
  );
}
