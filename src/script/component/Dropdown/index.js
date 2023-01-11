import React from 'react';
import style from './index.module.css';

class Dropdown extends React.Component {
  render() {
    const data = ['instance4', 'instance5', 'instance6'];
    const list = data.map((e, i) => {
      let item;
      switch (i) {
        case 0:
          item = <li className={[style.item, style.firstItem].join(' ')} key={i}>{e}</li>;
          break;
        case data.length - 1:
          item = <li className={[style.item, style.lastItem].join(' ')} key={i}>{e}</li>;
          break;
        default:
          item = <li className={style.item} key={i}>{e}</li>;
          break;
      }
      return item;
    });
    return(
      <ul className={style.dropdown}>
        {list}
      </ul>
    );
  }
}

export default Dropdown;
