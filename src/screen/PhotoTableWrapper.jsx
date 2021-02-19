import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import fetchPhotosAction from '../utils/fetchPhotos';
import {getPhotosError, getPhotos, getPhotosPending} from '../reducers/reducer';
import Photos from '../components/GeneralTable/GeneralTable';
import { photoConfig as tableConfig } from '../config/photoConfig';

class PhotoTableWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      filterStr: '',
      filter: false,
      searchCaseSensitive: tableConfig.searchCaseSensitive,
      displayedPhotos: [],
    }

    this.tableHeaders = tableConfig.headers;
    this.onChangeFilterStr = this.onChangeFilterStr.bind(this);
    this.hasFilterString = this.hasFilterString.bind(this);
  }

  componentDidMount() {
    const {fetchPhotos} = this.props;
    fetchPhotos();
  }

  componentDidUpdate(prevProps, prevState) {   
    if ((prevProps.pending !== this.props.pending) ||
        (prevProps.items !== this.props.items) ||
        (prevState.searchCaseSensitive !== this.state.searchCaseSensitive) ) {
      
      this.onChangeFilterStr(null, this.state.filterStr);
    } 
  }

  hasFilterString(photo, filterStr) {
    if (!filterStr && !filterStr.trim()) return photo;

    if (!this.state.searchCaseSensitive)
      filterStr = filterStr.toLowerCase();

    let testValue;
    for (let i = 0; i < this.tableHeaders.length; ++i) {
      testValue = get(photo, this.tableHeaders[i].field);

      if (testValue) {
        if (!this.state.searchCaseSensitive) 
          testValue = testValue.toLowerCase();

        if (testValue.includes(filterStr)) 
          return true;
      }     
    }

    return false;
  }

  onChangeFilterStr(event, filterStr) {
    if (event !== null) {
      event.preventDefault();
    }

    this.setState((prevState, props) => {
      const nextDisplayPhotos = props.items
      .filter(photo => this.hasFilterString(photo, filterStr));

      return {
          filterStr: filterStr,
          filter: !(filterStr.trim() === ""),
          displayedPhotos: nextDisplayPhotos,
      }
    });
  }

  onCaseChange(event) {
    const checked = event.target.checked;
    if (checked !== this.state.searchCaseSensitive) {
      this.setState({ searchCaseSensitive: checked });
    } 
  }

  render() {
    return (
      <>
      <h1 className="display-5 text-center">{tableConfig.title}</h1>
        <div className="header-area row d-flex align-items-center">
          <div className="col-12">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Search</label>
            <div className="input-group mb-2 align-middle">
              <div className="input-group-prepend">
                <div className="input-group-text"><FontAwesomeIcon icon="search" /></div>
              </div>
              <input type="text" className="form-control" id="inlineFormInputGroup"
              onChange={(e) => this.onChangeFilterStr(e, e.target.value)}
              placeholder="Search for..." />
            </div>
          </div>
        </div>

        <Photos 
          items={this.state.displayedPhotos}
          pending={this.props.pending}
          error={this.props.error}
          tableConfig={tableConfig}
          captionText="Photos"
        />
      </>
    );
  }
}

// export default PhotosWrapper;

const mapStateToProps = (state) => ({
  error: getPhotosError(state),
  items: getPhotos(state),
  pending: getPhotosPending(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPhotos: fetchPhotosAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoTableWrapper);
