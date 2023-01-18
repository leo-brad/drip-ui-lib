import React from 'react';
import ReactDOM from 'react-dom/client';
import '~/style/index.css';
import PointStaticLine from '~/script/component/PointStaticLine';

const data = [
  'list1',
  'list2',
  'list3',
  'list4',
  'list5',
  'list6',
  'list7',
  'list8',
  'list9',
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PointStaticLine data={data} />);
