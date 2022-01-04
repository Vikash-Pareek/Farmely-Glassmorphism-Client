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
    <div
      className=''
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className=''>
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
    <section>
      {showError()}
      {showLoading()}
      {redirectUser()}
      <div className="">
        <div className="">
          <LockOutlinedIcon />
        </div>
        <h1>Signin</h1>
        <form>
          <div>
            <label>Email<span>*</span></label>
            <input id='email' name='email' placeholder='Enter Email' autoComplete='email' onChange={handleChange('email')}
              type='email' value={email} required />
          </div>
          <div>
            <label>Password<span>*</span></label>
            <input name='password' placeholder='Enter Password' type='password' id='password' onChange={handleChange('password')}
              value={password} autoComplete='current-password' required />
          </div>
          <button onClick={clickSubmit} type='submit' className="">
            Signin
          </button>
          <div>
            <Link to='/signup'>
              {"Don't have an account? Signup"}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <Layout title='Enter to the world of FARMERLY.' path='/signin'>
      {signInForm()}
      <Copyright />
    </Layout>
  );
}
