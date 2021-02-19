export const FETCH_PHOTOS_PENDING = "FETCH_PHOTOS_PENDING";
export const FETCH_PHOTOS_SUCCESS = "FETCH_PHOTOS_SUCCESS";
export const FETCH_PHOTOS_ERROR = "FETCH_PHOTOS_ERROR";

export function fetchPhotosPending() {
    return {
        type: FETCH_PHOTOS_PENDING
    }
}

export function fetchPhotosSuccess(items) {
    return {
        type: FETCH_PHOTOS_SUCCESS,
        items: items
    }
}

export function fetchPhotosError(error) {
    return {
        type: FETCH_PHOTOS_ERROR,
        error: error
    }
}