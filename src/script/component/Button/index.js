import React from 'react';
import style from './index.module.css';

class Button extends React.Component {
  render() {
    return(
      <button className={[style.button, style.active].join(' ')}>
      </button>
    );
  }
}

export default Button;
