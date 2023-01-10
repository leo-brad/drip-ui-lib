import React from 'react';
import style from './index.module.css';
import Button from '~/script/component/Button';

class Tab extends React.Component {
  render() {
    const data = ['left', 'button1', 'button2', 'button3', 'right'];
    const buttons = data.map((e, k) => {
      let t;
      switch (k) {
        case 0:
          t = 'f';
          break;
        case data.length - 1:
          t = 'l';
          break
        default:
          break;
      }
      return(
        <Button t={t} key={k}>{e}</Button>
      );
    });
    return(
      <div className={style.tab}>
        <div className={style.buttonList}>
          {buttons}
        </div>
      </div>
    );
  }
}

export default Tab;
