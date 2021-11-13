import createDataContext from './createDataContext';
import api from '../api/create-market';

const SAVE_SELLER_APP = 'save-seller-app';
const VALIDATION = 'validation';
const FETCH_POLE = 'fetch-pole';
const SAVE_POLE = 'save-pole';
const BACK = 'back';

const reducer = (state = {}, {type, payload}) => {
  switch (type) {
    case SAVE_SELLER_APP:
      return {...payload, serverErrors: {}, step: 2};
    case SAVE_POLE:
      return {step:3}
    case VALIDATION:
      return {...state, serverErrors: payload};
    case FETCH_POLE:
      return {...state, pole: payload};
    case BACK:
      return {...state, step: 1};
    default:
      return state;
  }
};

const errorHandler = ({response}, dispatch) => {
  if (response.status === 422) {
    dispatch({type: VALIDATION, payload: response.data.errors});
    return;
  }

  alert('Oops something went wrong!');
};

const saveSellerForm = dispatch => (formData) => {
  api.post('save-seller-form', formData)
    .then((response) => {
      dispatch({type: SAVE_SELLER_APP, payload: response.data});
    })
    .catch((err) => {
      errorHandler(err, dispatch);
    });
};

const fetchPole = dispatch => async () => {
  try {
    const response = await api.get('pole/Seller Form');
    dispatch({type: FETCH_POLE, payload: response.data});
  } catch (err) {
    errorHandler(err, dispatch);
  }
};

const savePole = dispatch => async (formData) => {
  try {
    const response = await api.post('save-pole', formData);
    dispatch({type: SAVE_POLE, payload: response.data, step: 3});
  } catch (err) {
    errorHandler(err, dispatch);
  }
};

const goBack = dispatch => () => {
  dispatch({type: BACK});
};

export const {Provider, Context} = createDataContext(
  reducer,
  {saveSellerForm, savePole, fetchPole, goBack},
  {serverErrors: {}, step: 1}
);