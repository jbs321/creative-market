import React from 'react';
import ReactDOM from 'react-dom';
import SellerForm from './src/components/Form/SellerForm';
import {Provider as SellerFormContext} from './src/Context/SellerFormContext';

ReactDOM.render(
  <div className={'box'}>
    <SellerFormContext>
      <SellerForm/>
    </SellerFormContext>
  </div>,
  document.querySelector('#root')
);
