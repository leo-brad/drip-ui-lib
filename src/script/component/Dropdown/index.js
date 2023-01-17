import React from 'react';
import style from './index.module.css';

function formatUnit(val) {
  return val + 'px';
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.id = new Date().getTime().toString();
    this.state = {
      data: ['instance4', 'instance5', 'instance6'],
      height: undefined,
      open: true,
    };
    this.transition = this.transition.bind(this);
  }

  componentDidMount() {
    const { id, } = this;
    const dom = document.getElementById(id);
    this.dom = dom;
  }

  transition() {
    let { height, } = this.state;
    const { dom, } = this;
    if (height === undefined) {
      height = dom.offsetHeight;
    }
    const newHeight = height - 4;
    this.setState({
      height: newHeight,
    });
    if (newHeight > 0) {
      window.requestAnimationFrame(this.transition);
    } else {
      this.setState({
        open: false,
      });
    }
  }

  close() {
    this.transition();
  }

  render() {
    const { id, } = this;
    const { data, height, } = this.state;
    const items = data.map((e, i) => {
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
    let list = null;
    const { open, } = this.state;
    if (open) {
      list =
        <ul id={id} className={style.dropdown} style={{ height: formatUnit(height) }}>
          {items}
        </ul>;
    }
    return list;
  }
}

export default Dropdown;
