import React from 'react';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TableConfigType from '../../types/TableConfigType';
import PhotoType from '../../types/Photo';

interface PhotosProps {
  pending: boolean
  items: Array<PhotoType>
  error: boolean
  tableConfig: TableConfigType
  captionText: string
}


const Photos: React.FC<PhotosProps> = (props) => {
  
  const { items, pending, error, tableConfig, captionText } = props;

  let displayItems: (PhotoType)[] = items;

  const noItems = items? (items.length <= 0) : true;
  const tableHeaders = tableConfig.headers;
  const alignments = tableConfig.alignments
  const cols = tableConfig.cols;
  const getFieldValue = (item: PhotoType, header:   any) => {
    return get(item, header.field);
  }
  const getFieldPhoto = (item: PhotoType, header:   any) => {
    return item.thumbnailUrl;
  }

  return(
    <>
    {!error && !pending && !noItems &&
    (<div className="table-responsive">
      <table className="table w-100 d-block d-md-table table-striped table-hover center">
      <thead className="thead">
        <tr className="row d-flex align-items-stretch">
        {!pending && !error && 
         tableHeaders.map( (header, i) => {
          let col = (cols[i]===-1) ? "col" : `col-${cols[i]}`;
          return(
          <th
            className={`${col} text-center`}
            id={`${header.field}`}
            key={`${header.field}`}>{header.display}
          </th>)
        }
        )}
        </tr>
      </thead>
      <tbody>
      {!pending && !error && items &&      
        displayItems
        .map(item => (
          <tr
            className="row"
            id={`item.id`}
            key={item.title}
          >
            {tableHeaders
            .map((header, i:number) => {
              let col = (cols[i]===-1) ? "col" : `col-${cols[i]}`;
              if (header.display === "Photo") {
                return(
                  <td 
                  key={`${item.id}_h_${i}`} 
                  className={`text-${alignments[i]} ${col}`}  
                  >
                    <img src={getFieldPhoto(item, header)} alt="avatar"/>
                  </td>)
              } else {
                return(
                <td 
                key={`${item.id}_h_${i}`} 
                className={`text-${alignments[i]} ${col}`}  
                >{getFieldValue(item, header)}
                  </td>)
              }
              
            })}
          </tr>
        ))
      }
      </tbody>
    </table></div>
    )}
    <hr />
    {!error && !pending && (
        !noItems? (
        <h3 className="caption">{displayItems.length} {captionText}  </h3>) :
          (<h3 className="caption">No {captionText} found</h3>)
    )}
    {error && 
    <div className="container">
      <h2>Error message</h2>
    </div>}
    {pending && 
    <div className="container">
      <FontAwesomeIcon icon="spinner" size="3x" spin /></div>}
    </>
  );
};

export default Photos;