import React from 'react';

const PoleConfirmation = () => {
    return <div className="card form-container">
    <div className="card-body submitted-body">
      <div className="top-logo">
        <img src="image/icon-sent.png"/>
      </div>
      <h5 className="card-title" style={styles.title}>Thank you for applying to become a sellet with creative Market!</h5>
      <p className="card-text" style={{fontSize: 12}}>
        Our curators are reviewing your application, We'll get back to you within 5-7 business days. Meanwhile, you already have access to your Shop Studio, so let's start setting up your shop!
      </p>
    </div>
  </div>;
};
const styles = {
  title: {
    fontWeight: 'bold',
  }
};


export default PoleConfirmation;