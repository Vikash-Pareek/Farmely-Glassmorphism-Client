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
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // so that browser does not reload
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    }); // sending js object
  };

  const showError = () => (
    <div
      className=''
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className=''
      style={{ display: success ? '' : 'none' }}
    >
      New account is created. Please <Link to='/signin'>Signin</Link>.
    </div>
  );

  const signUpForm = () => (
    <section>
      {showSuccess()}
      {showError()}
      <div className="">
        <div className="">
          <LockOutlinedIcon />
        </div>
        <h1>Signup</h1>
        <form className="">
          <div>
            <div>
              <label>Full Name<span>*</span></label>
              <input autoComplete='off' onChange={handleChange('name')} type='text' name='name' placeholder='Enter Full Name'
                value={name} id='name' required />
            </div>
            <div>
              <label>Email<span>*</span></label>
              <input id='email' name='email' placeholder='Enter Email' onChange={handleChange('email')} type='email'
                value={email} autoComplete='off' required />
            </div>
            <div>
              <label>Create Password<span>*</span></label>
              <input name='password' placeholder='Enter Password' type='password' id='password' onChange={handleChange('password')}
                value={password} autoComplete='current-password' required />
            </div>
          </div>
          <button type='submit' className="" onClick={clickSubmit}>
            Signup
          </button>
          <div>
            <Link to='/signin'>
              Already have an account? Signin
            </Link>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <Layout title='Join the team of FARMERLY.' path='/signup'>
      {signUpForm()}
      <Copyright />
    </Layout>
  );
}
