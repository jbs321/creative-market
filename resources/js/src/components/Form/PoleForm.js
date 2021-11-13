import React, {useContext, useEffect, useState} from 'react';
import {Context as SellerFormContext} from '../../Context/SellerFormContext';

const PoleForm = () => {
  const {state: {pole, uuid}, fetchPole, goBack, savePole} = useContext(SellerFormContext);
  const [form, setFrom] = useState({});
  const select = [];

  useEffect(() => {
    fetchPole();
  }, []);

  const renderErrorLabel = (error) => {
    if (!error) {
      return null;
    }

    if (Array.isArray(error)) {
      return <div className="validation-msg">{error.join(', ')}</div>;
    }

    if (typeof (error) === 'string') {
      return <div className="validation-msg">{error}</div>;
    }
  };

  const onSubmit = () => {
    savePole({questions: form, user: uuid, pole: pole.uuid});
  };

  const renderSelect = ({question, uuid, options}) => {
    return <div key={uuid} className="form-group col-12">
      <div className={'row'}>
        <div className={'col-12'}>
          <label>{question}</label>
          <select id={uuid} onChange={(e) => {
            setFrom({...form, [uuid]: e.target.value});
          }} className="form-control">
            <option>Select Category</option>
            {_.map(options, (op) => {
              return <option value={op.uuid} key={op.uuid}>{op.option}</option>;
            })}
          </select>
        </div>
      </div>
    </div>;
  };

  const renderPole = (pole) => {
    if (_.isEmpty(pole)) {
      return <img style={{width: '100%'}} src="image/spinner.gif"/>;
    }

    return <div className="row">
      {_.map(pole.questions, (q) => {
        return renderSelect(q);
      })}
    </div>;
  };

  return <div className="card form-container">
    <div className="card-body">
      <div style={{height: 20}}>
        <p className="card-text" style={styles.sellerTextLeft}>SELLER APPLICATION</p>
        <p className="card-text" style={styles.sellerTextRight}>STEP 2 of 2</p>
      </div>

      <h5 className="card-title" style={styles.title}>Tell us a little about yourself</h5>

      <p className="card-text" style={{fontSize: 12}}>
        You answers will help us provide you with a more personalized experience as a seller!
      </p>

      {renderPole(pole)}

      <div className="row">
        <div className={'col-12 btn-wrapper'}>
          <a href="#" className="btn btn-primary next-btn" style={styles.submit} onClick={onSubmit}>
            Submit Application
          </a>
          <a href="#" className="btn btn-secondary back-btn" onClick={goBack} style={styles.back}>{'<'} Back</a>
        </div>
      </div>
    </div>
  </div>;
};

const styles = {
  submit: {
    float: 'right',
    minWidth: 150,
  },
  back: {
    float: 'left'
  },
  textArea: {
    resize: 'none',
  },
  sellerTextLeft: {
    float: 'left',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  sellerTextRight: {
    float: 'right',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  title: {
    fontWeight: 'bold',
  },
};

export default PoleForm;