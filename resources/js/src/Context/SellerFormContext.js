import createDataContext from "./createDataContext";
import api from "../api/create-market";

const SAVE_SELLER_APP = 'save-seller-app';
const SAVE_POLE = 'save-pole';
const VALIDATION = 'validation';

const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case SAVE_SELLER_APP:
            return {...payload, serverErrors: {}};
        case VALIDATION:
            return {...state, serverErrors: payload};
        default:
            return state;
    }
}

const errorHandler = ({response}, dispatch) => {
    if(response.status === 422) {
        dispatch({type: VALIDATION, payload: response.data.errors})
        return;
    }

    alert('Oops something went wrong!');
}

const saveSellerForm = dispatch => (formData) => {
    api.post('save-seller-form', formData)
      .catch((err) => {
        errorHandler(err, dispatch);
    });
}

const savePole = dispatch => async (formData) => {
    try {
        const response = await api.post('someRoute', formData);
        dispatch({type: SAVE_POLE, payload: formData})
    } catch (err) {
        errorHandler(err, dispatch);
    }
}

export const {Provider, Context} = createDataContext(
    reducer,
    {saveSellerForm, savePole},
    {serverErrors: {}}
);