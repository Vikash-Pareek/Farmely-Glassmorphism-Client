import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from '../core/Layout';
import { signup } from '../auth';
import Copyright from '../core/Copyright';
import "./UserAuth.css";


export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    success: false,
  });

  const { name, email, password, success, error, loading } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false, loading: true });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          success: true,
        });
      }
    }); // sending js object
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

  const showSuccess = () => (
    <h2
      className='success-text'
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'><span>Signin</span></Link>.
    </h2>
  );

  const signUpForm = () => (
    <div className='user-auth-form-container'>
      <div className='user-auth-icon'>
        <LockOutlinedIcon fontSize='large' />
      </div>
      <h1>Signup</h1>
      <form className='user-auth-form'>
        <div className='form-field-container'>
          <label for='name'>Full Name<span>*</span></label>
          <input autoComplete='off' onChange={handleChange('name')} type='text' name='name' placeholder='Enter Full Name'
            value={name} id='name' required />
        </div>
        <div className='form-field-container'>
          <label for='email'>Email<span>*</span></label>
          <input id='email' name='email' placeholder='Enter Email' onChange={handleChange('email')} type='email'
            value={email} autoComplete='off' required />
        </div>
        <div className='form-field-container'>
          <label for='password'>Create Password<span>*</span></label>
          <input name='password' placeholder='Enter Password' type='password' id='password' onChange={handleChange('password')}
            value={password} autoComplete='current-password' required />
        </div>
        <button type='submit' className='user-auth-form-btn' onClick={clickSubmit}>
          Signup
        </button>
      </form>
      <Link to='/signin'>
        <p className='form-link-text'>Already have an account? Signin</p>
      </Link>
    </div>
  );

  return (
    <Layout title='Join the community of FARMERLY.' path='/signup'>
      <section id='user-auth-container'>
        {showSuccess()}
        {showError()}
        {showLoading()}
        {signUpForm()}
      </section>
      <Copyright />
    </Layout>
  );
}
