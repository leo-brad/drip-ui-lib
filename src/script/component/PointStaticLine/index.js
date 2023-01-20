import React from 'react';
import style from './index.module.css';
import PointLine from '~/script/component/PointLine';
import renderToNode from '~/script/lib/renderToNode';

class PointStaticLine extends PointLine {
  constructor(props) {
    super(props);
  }

  addItem(t) {
    const { ul, template, id, } = this;
    const idx = this.getIndex();
    const d = this.props.data[idx];
    if (d !== undefined) {
      this.idx = idx;
      const li = renderToNode(<li id={this.getKey(idx)} key={idx}>{d}</li>);
      switch (t) {
        case 2: {
          ul.append(li);
          break;
        }
        case 1: {
          ul.append(li);
          break;
        }
        case 0: {
          ul.prepend(li);
          break;
        }
      }
      this.li = li;
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  render() {
    const { id, } = this;
    return(
      <ul id={id} className={style.pointStaticLine} />
    );
  }
}

export default PointStaticLine;
