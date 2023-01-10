import React from 'react';
import style from './index.module.css';

class Button extends React.Component {
  render() {
    const { t, } = this.props;
    let button;
    switch (t) {
      case 'f':
        button = <button className={[style.tabButton, style.tabButtonFirst, style.active].join(' ')}>
          {this.props.children}
        </button>
        break;
      case 'l':
        button = <button className={[style.tabButton, style.tabButtonLast, style.active].join(' ')}>
          {this.props.children}
        </button>
        break;
      default:
        button = <button className={[style.tabButton, style.active].join(' ')}>
          {this.props.children}
        </button>
        break;
    }
    return button;
  }
}

export default Button;
