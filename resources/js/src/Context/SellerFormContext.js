import createDataContext from "./createDataContext";

const SAVE_SELLER_APP = 'save-seller-app';
const SAVE_POLE = 'save-pole';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case SAVE_SELLER_APP:
            return {}
        default:
            return state;
    }
}

const errorHandler = (er, dispatch) => {
    dispatch({
        type: 'add_error',
        payload: 'Oops something went wrong! Try again later'
    })
}

const saveSellerForm = dispatch => async (formData) => {
    try {
        console.log(formData);
        // const response = await api.post('someRoute', formData);
        // dispatch({type: SAVE_SELLER_APP, payload: response.data.token})
        // navigate('TrackList')
    } catch (err) {
        errorHandler(err, dispatch);
    }
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
    {}
);