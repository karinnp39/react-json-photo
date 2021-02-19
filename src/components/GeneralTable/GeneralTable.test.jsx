import React from 'react';
import { shallow, unmount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react';

import GeneralTable from './GeneralTable';
import { photoConfig as PhotoTableConfig } from '../../config/photoConfig';
import testPhoto from '../../utils/testPhoto';

const historyMock = jest.fn(() => {
  return true;
});

let photoTableProps = {
  items: testPhoto,
  tableConfig: {...PhotoTableConfig},
  pending: false,
  error: false,
  onRowClick: historyMock,
  captionText: "Photos"
};

describe('enzyme smoke tests', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<GeneralTable 
      {...photoTableProps} />);
  });

  afterAll(() => {
    unmount(wrapper);
  });
  it('matches napshot', () => {   
    expect(wrapper).toMatchSnapshot();
  });
  
  it('actually have a single table element', () => {
    expect(wrapper.find('table').length).toBe(1);
  });
});

describe('the initial test photo data', () => {
it('should display a the test photo in table row', () => {
    const { container, getByText } = render(<GeneralTable {...photoTableProps} />);

    const tableNode = container.querySelector('table');
    expect(tableNode).toBeInTheDocument();

    const tdNode = getByText(testPhoto[0].name);
    expect(tdNode.textContent).toBe('Ervin Howell');
  });

  it('should display the photo table configuration columns', () => {
    const { container, getByText } = render(<GeneralTable {...photoTableProps} />);

    const headerNode = container.querySelector('thead');
    expect(headerNode).toBeInTheDocument();

    PhotoTableConfig.headers.forEach((value, key) => {
      const tdNode = getByText(value['display']);
      expect(tdNode.textContent).toBe(PhotoTableConfig.headers[key].display);
    });
  });

  it('should display the correct number of photos', () => {
    const { container } = render(<GeneralTable {...photoTableProps} />);
    const captionNode = container.querySelector('.caption');
    expect(captionNode).toBeInTheDocument();

    const lengthStr = testPhoto.length.toString();
    expect(captionNode.textContent.includes(lengthStr)).toBeTruthy();
  });
});

describe('The photo table\'s row click', () => {
  it('calls correct function from parent component', async () => {
    const { container } = render(<GeneralTable {...photoTableProps} />);

    const tableRow = container.querySelector('tbody tr');
    fireEvent.click(tableRow);
    await expect(historyMock).toHaveBeenCalled();
  });
});
