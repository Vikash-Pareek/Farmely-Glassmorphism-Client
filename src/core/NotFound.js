import React from 'react';
import Layout from './Layout';
import Copyright from './Copyright';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => {
  return (
    <Layout
      title='Error: 404'
    >
      <h3>
        <WarningIcon style={{ fontSize: 50, color: '#FF7D00' }} />
        Sorry, this page does not exist!
      </h3>
      <Copyright />
    </Layout>
  );
};

export default NotFound;
