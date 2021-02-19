import { fetchPhotosPending, fetchPhotosSuccess, fetchPhotosError } from '../actions/actionPhotos';
import userConfig from '../config/photoConfig';

function fetchPhotos() {
    return dispatch => {
        dispatch(fetchPhotosPending());

        fetch(userConfig.apiUrl)
            .then(res => res.json())
            .then(res => {
                if (!res.length) {
                    throw (res.error);
                }

                dispatch(fetchPhotosSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchPhotosError(error));
            })
    }
}

export default fetchPhotos;