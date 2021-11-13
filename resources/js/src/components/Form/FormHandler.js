import React, {useContext} from 'react';
import SellerForm from './SellerForm';
import PoleForm from './PoleForm';
import {Context as SellerFormContext} from '../../Context/SellerFormContext';
import PoleConfirmation from './PoleConfirmation';

const FormHandler = () => {
  const {
    state: {step}
  } = useContext(SellerFormContext);

  switch (step) {
    case 1:
      return <SellerForm/>;
    case 2:
      return <PoleForm/>;
    case 3:
      return <PoleConfirmation/>;
    default:
      return 'Oops something went wrong';
  }
};

export default FormHandler;