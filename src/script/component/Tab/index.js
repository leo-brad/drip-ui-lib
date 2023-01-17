import React from 'react';
import style from './index.module.css';
import Button from '~/script/component/Button';
import Dropdown from '~/script/component/Dropdown';

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      instances: ['left', 'instance1', 'instance2', 'instance3', 'right'],
    };
  }

  render() {
    const { instances, } = this.state;
    const buttons = instances.map((e, k) => {
      let t;
      switch (k) {
        case 0:
          t = 'f';
          break;
        case instances.length - 1:
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
        <Dropdown />
      </div>
    );
  }
}

export default Tab;
