import PhotoType from './Photo';

interface fetchPhotosPending {
  type: string,
}

interface fetchPhotosSuccess {
  type: string,
  items: Array<PhotoType>,
}

interface fetchPhotosError {
  type: string,
  error: boolean,
}

export type ActionTypes = fetchPhotosPending | fetchPhotosSuccess | fetchPhotosError;