import React, {useContext, useState} from 'react';
import {Context as SellerFormContext} from '../../Context/SellerFormContext';

const SellerForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [category, setCategory] = useState('');
  const [option, setOption] = useState('');
  const [link, setLink] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [store, setStore] = useState('');

  const {
    state,
    saveSellerForm,
  } = useContext(SellerFormContext);

  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return pattern.test(url);
  }

  const validate = () => {
    const newErrors = {};

    if (!firstName || firstName === '') newErrors.firstName = 'cannot be blank!';
    else if (firstName.length > 30) newErrors.firstName = 'name is too long!';

    if (!lastName || lastName === '') newErrors.lastName = 'cannot be blank!';
    else if (lastName.length > 30) newErrors.lastName = 'name is too long!';

    if (!category || category === '') newErrors.category = 'select a category!';

    if (!link || link === '') newErrors.link = 'cannot be blank!';
    else if (link.length > 256) newErrors.link = 'link is too long!';
    else if (validateURL(link)) newErrors.link = 'Select a proper url!';

    if(!confirm) newErrors.confirm = 'Please confirm!'

    if (!option || option === '') newErrors.option = 'Please select option!';

    if (option && option === 'yes' && !(store && store !== '')) newErrors.store = 'cannot be blank!';

    if (Object.keys(newErrors).length === 0) {
      return true
    }

    setErrors(newErrors);
    return true;
  };

  const onSubmit = () => {
    // validate();
    saveSellerForm({
      firstName: firstName.target.value,
      lastName:lastName.target.value,
      category:category.target.value,
      link:link.target.value,
      store:store.target.value,
    })
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
            <label htmlFor="firstName">First Name</label>
            <input type="text" defaultValue={firstName} onChange={setFirstName} className="form-control" id="firstName"/>
            {errors.firstName ? <div className="validation-msg">{errors.firstName}</div> : ''}
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" defaultValue={lastName} onChange={setLastName} className="form-control" id="lastName"/>
            {errors.lastName ? <div className="validation-msg">{errors.lastName}</div> : ''}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="link">Portfolio Link</label>
            <input type="text" defaultValue={link} onChange={setLink} placeholder={'mysite.com'} className="form-control" id="link"/>
            {errors.link ? <div className="validation-msg">{errors.link}</div> : ''}


            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue={confirm} id="confirm" onChange={setConfirm}/>
              <label className="form-check-label" htmlFor="confirm">
                Yes, I confirm that the content I submit is authored by me.
              </label>
            </div>
            {errors.confirm ? <div className="validation-msg">{errors.confirm}</div> : ''}
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Your Shop Category</label>
            <select onChange={setCategory} defaultValue={category} className="form-control"
                    id="exampleFormControlSelect1">
              <option>Select Category</option>
              <option>Graphics</option>
              <option>FontsTemplates</option>
              <option>Add-ons</option>
              <option>PhotosWeb Themes</option>
              <option>3D</option>
            </select>
            {errors.category ? <div className="validation-msg">{errors.category}</div> : ''}
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
            <label className="form-check-label" htmlFor="option2"> No </label>
            {errors.option ? <div className="validation-msg">{errors.option}</div> : ''}
          </div>
        </div>
      </div>
      {option === 'yes' ? <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="stores">Online stores I sell on today</label>
            <textarea defaultValue={store} onChange={setStore} style={styles.textArea} className="form-control" id="stores" rows="3" />
            {errors.store ? <div className="validation-msg">{errors.store}</div> : ''}
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