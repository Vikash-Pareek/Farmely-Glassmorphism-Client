import React from 'react';
import "./Copyright.css";

export default function Copyright() {
  return (
    <footer id='copyright-container'>
      <p align='center'>
        Farmerly &ensp;-&ensp; Copyright © {new Date().getFullYear()}<br />Website Developed By <span>Vikash Pareek</span> and <span>Umair Shaik</span>.
      </p>
    </footer>
  );
}
