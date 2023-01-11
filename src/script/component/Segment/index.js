import React from 'react';
import style from './index.module.css';

class Segment extends React.Component {
  render() {
    return(
      <div className={style.segment}>
        <div className={style.title}>Stdout: 1</div>
      </div>
    );
  }
}

export default Segment;
