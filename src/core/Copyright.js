import React from 'react';
import { Link } from 'react-router-dom';
import "./Copyright.css";

export default function Copyright() {
  return (
    <footer id='copyright-container'>
      <p align='center'>
        Farmerly &ensp;-&ensp; Copyright © {new Date().getFullYear()}<br />Website Developed By
        &nbsp;
        <Link to={{ pathname: 'https://www.linkedin.com/in/vikash-pareek/' }} target="_blank"><span>Vikash Pareek</span></Link>
        &nbsp;
        and
        &nbsp;
        <Link to={{ pathname: 'https://www.linkedin.com/in/umair-shaik-40849517a/' }} target="_blank"><span>Umair Shaik</span></Link>.
      </p>
    </footer>
  );
}
