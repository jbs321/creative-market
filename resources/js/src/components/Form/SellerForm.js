import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Context as SellerFormContext} from '../../Context/SellerFormContext';

const SellerForm = () => {
  const [first_name, setFirstName] = useState('Jacob');
  const [last_name, setLastName] = useState('Balabanov');
  const [category, setCategory] = useState('3D');
  const [option, setOption] = useState('yes');
  const [portfolio_link, setLink] = useState('http://homestead.test');
  const [confirm, setConfirm] = useState('checked');
  const [store_urls, setStore] = useState('sdasdas');

  const {
    state: {serverErrors},
    saveSellerForm,
  } = useContext(SellerFormContext);

  const [errors, setErrors] = useState(serverErrors);

  useEffect(function () {
    setErrors(serverErrors);
  }, [serverErrors]);

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

  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return pattern.test(url);
  };

  const validate = () => {
    const newErrors = {};

    if (!first_name || first_name === '') newErrors.first_name = ['cannot be blank!'];
    else if (first_name.length > 30) newErrors.first_name = ['name is too long!'];

    if (!last_name || last_name === '') newErrors.last_name = ['cannot be blank!'];
    else if (last_name.length > 30) newErrors.last_name = ['name is too long!'];

    if (!category || category === '') newErrors.category = ['select a category!'];

    if (!portfolio_link || portfolio_link === '') newErrors.portfolio_link = ['cannot be blank!'];
    else if (portfolio_link.length > 256) newErrors.portfolio_link = ['link is too long!'];
    else if (!validateURL(portfolio_link)) newErrors.portfolio_link = ['Select a proper url!'];

    if (!confirm) newErrors.confirm = ['Please confirm!'];

    if (!option || option === '') newErrors.option = ['Please select option!'];

    if (option && option === 'yes' && !(store_urls && store_urls !== '')) newErrors.store_urls = ['cannot be blank!'];

    if (Object.keys(newErrors).length === 0) {
      return true;
    }

    setErrors(newErrors);
    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      saveSellerForm({
        first_name,
        last_name,
        category,
        portfolio_link,
        store_urls
      });
    }
  };

  return <div className="card form-container">
    <div className="card-body">
      <div style={{height: 20}}>
        <p className="card-text" style={styles.sellerTextLeft}>SELLER APPLICATION</p>
        <p className="card-text" style={styles.sellerTextRight}>STEP 1 of 2</p>
      </div>

      <h5 className="card-title" style={styles.title}>Share your work with us</h5>

      <p className="card-text" style={{fontSize: 12}}>
        To insure the quality of our marketplace, we limit our seller community to the most qulified creators.
        let our curators know why you'd be a great seller.
      </p>

      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" defaultValue={first_name} onChange={(e) => setFirstName(e.target.value)}
                   className="form-control" id="first_name"/>
            {renderErrorLabel(errors.first_name)}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" defaultValue={last_name} onChange={(e) => setLastName(e.target.value)}
                   className="form-control" id="last_name"/>
            {renderErrorLabel(errors.last_name)}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>Portfolio Link</label>
            <input type="text"
                   defaultValue={portfolio_link}
                   onChange={(e) => setLink(e.target.value)}
                   placeholder={'mysite.com'}
                   className="form-control"/>
            {renderErrorLabel(errors.portfolio_link)}


            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={confirm} id="confirm" onChange={setConfirm}/>
              <label className="form-check-label">
                Yes, I confirm that the content I submit is authored by me.
              </label>
            </div>
            {renderErrorLabel(errors.confirm)}
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="category">Your Shop Category</label>
            <select onChange={(e) => setCategory(e.target.value)} defaultValue={category} className="form-control"
                    id="category">
              <option>Select Category</option>
              <option>Graphics</option>
              <option>FontsTemplates</option>
              <option>Add-ons</option>
              <option>PhotosWeb Themes</option>
              <option>3D</option>
            </select>
            {renderErrorLabel(errors.category)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <label htmlFor="options">Did you already have an online store?</label>
          <div className="form-check">
            <input onChange={() => setOption('yes')} className="form-check-input" type="radio" name="options"/>
            <label className="form-check-label" htmlFor="option1"> Yes </label>
          </div>
          <div className="form-check form-group">
            <input onChange={() => setOption('no')} className="form-check-input" type="radio" name="options"/>
            <label className="form-check-label"> No </label>
            {renderErrorLabel(errors.option)}
          </div>
        </div>
      </div>
      {option === 'yes' ? <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label>Online stores I sell on today</label>
            <textarea defaultValue={store_urls} onChange={(e) => setStore(e.target.value)} style={styles.textArea}
                      className="form-control" rows="3"/>
            {renderErrorLabel(errors.store_urls)}
          </div>
        </div>
      </div> : ''}

      <a href="#" className="btn btn-primary next-btn" style={styles.btnPrimary} onClick={onSubmit}>Next</a>
    </div>
  </div>;
};

const styles = {
  btnPrimary: {
    float: 'right',
    minWidth: 150,
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

export default SellerForm;