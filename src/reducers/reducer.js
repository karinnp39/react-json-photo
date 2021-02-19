import { FETCH_PHOTOS_PENDING, FETCH_PHOTOS_SUCCESS, FETCH_PHOTOS_ERROR } from '../actions/actionPhotos';

let initialState = {
    items: [],
    pending: true,
    error: false,
};

function reduxThunkReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PHOTOS_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_PHOTOS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                pending: false,
                items: action.items
            }

        default:
            return state;
    }
}

export const getPhotos = state => state.items;
export const getPhotosPending = state => state.pending;
export const getPhotosError = state => state.error;

export default reduxThunkReducer;