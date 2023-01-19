import React from 'react';
import style from './index.module.css';
import TabButton from '~/script/component/TabButton';
import Dropdown from '~/script/component/Dropdown';
import PointDynamicLine from '~/script/component/PointDynamicLine';

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
        <TabButton t={t} key={k}>{e}</TabButton>
      );
    });
    const a = <PointDynamicLine />;
    return(
      <div className={style.tab}>
        {buttons}
        <Dropdown />
      </div>
    );
  }
}

export default Tab;
