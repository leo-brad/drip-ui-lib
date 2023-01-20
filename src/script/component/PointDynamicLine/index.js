import React from 'react';
import style from './index.module.css';
import PointLine from '~/script/component/PointLine';
import renderToNode from '~/script/lib/renderToNode';
import ReactDOM from 'react-dom/client';

class PointDynamiceLine extends PointLine {
  constructor(props) {
    super(props);
  }

  addItem(t) {
    const { ul, id, } = this;
    const idx = this.getIndex();
    const d = this.props.data[idx];
    if (d !== undefined) {
      this.idx = idx;
      const id = this.getKey(idx);
      const component = <div>{d}</div>;
      const node = renderToNode(<li id={id} />);
      switch (t) {
        case 2: {
          ul.append(node);
          break;
        }
        case 1: {
          ul.append(node);
          this.right = idx;
          break;
        }
        case 0: {
          ul.prepend(node);
          this.left = idx;
          break;
        }
      }
      this.li = document.getElementById(id);
      const { li, } = this;
      if (li) {
        const root = ReactDOM.createRoot(li);
        root.render(component);
      }
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  render() {
    const { id, } = this;
    return(
      <ul id={id} className={style.pointDynamicLine} />
    );
  }
}

export default PointDynamiceLine;
