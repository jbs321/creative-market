import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as SellerFormContext} from './src/Context/SellerFormContext';
import FormHandler from './src/components/Form/FormHandler';

ReactDOM.render(
  <div className={'box'}>
    <SellerFormContext>
      <FormHandler/>
    </SellerFormContext>
  </div>,
  document.querySelector('#root')
);
