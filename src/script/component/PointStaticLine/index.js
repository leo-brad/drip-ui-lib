import React from 'react';
import style from './index.module.css';
import PointLine from '~/script/component/PointLine';
import renderToNode from '~/script/lib/renderToNode';

class PointStaticLine extends PointLine {
  constructor(props) {
    super(props);
  }

  addItem(t) {
    const { ul, id, } = this;
    const idx = this.getIndex();
    if (idx >= 0 && idx < this.props.data.length) {
      const d = this.props.data[idx];
      if (idx < 0) {
        this.setType('l');
      }
      if (idx > this.props.data.length - 1) {
        this.setType('r');
      }
      if (d !== undefined) {
        this.idx = idx;
        const id = this.getKey(idx);
        this.key = id;
        const li = renderToNode(<li id={this.getKey(idx)} key={idx}>{d}</li>);
        switch (t) {
          case 2: {
            ul.append(li);
            global.left = undefined;
            global.rigth = undefined;
            break;
          }
          case 1: {
            ul.append(li);
            global.right = idx;
            break;
          }
          case 0: {
            ul.prepend(li);
            global.left = idx;
            break;
          }
        }
        this.li = li;
        this.isUpdate = true;
        this.num += 1;
      } else {
        this.isUpdate = false;
      }
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
