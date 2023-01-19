import React from 'react';
import { createPortal, } from 'react-dom';
import style from './index.module.css';
import renderToNode from '~/script/lib/renderToNode';

class PointDynamiceLine extends React.Component {
  constructor(props) {
    super(props);
    const { data, } = this.props;
    this.isUpdate = false;
    this.widths = {};
    this.doms = {};
    this.id = new Date().getTime().toString();
  }

  componentDidMount() {
    const { id, } = this;
    const ul = document.getElementById(id);
    this.ul = ul;
    this.width = ul.clientWidth;
    this.setLocation(0);
  }

  setItem(item) {
    this.item = item;
  }

  setList(list) {
    this.list = list;
  }

  setLocation(location) {
    this.location = location;
    this.count = 0;
    this.addItem(2);
    this.count += 1;
    const { ul, } = this;
    ul.style.visibility = 'hidden';
    while (true) {
      const { count, } = this;
      this.r = count % 2;
      const { r, } = this;
      this.addItem(r);
      this.count += 1;
      if (this.detectEdge()) {
        break;
      }
    }
    ul.style.visibility = 'visible';
  }

  getDom(key) {
    const { doms, } = this;
    if (doms[key] === undefined) {
      doms[key] = document.getElementById(key);
    }
    return doms[key];
  }

  getWidth(key) {
    const { widths, } = this;
    if (widths[key] === undefined) {
      widths[key] = this.getDom(key).clientWidth;
    }
    return widths[key];
  }

  getLeft(key) {
    return this.getDom(key).offsetLeft;
  }

  getRight(key) {
    const width = this.getWidth(key);
    const left = this.getLeft(key);
    return left + width;
  }

  getKey(key) {
    const { id, } = this;
    return id + key;
  }

  detectEdge() {
    let ans = false;;
    const { r, idx, li, isUpdate, } = this;
    if (idx !== undefined && isUpdate) {
      switch (r) {
        case 1: {
          const right = this.getRight(this.getKey(idx));
          if (right > this.width) {
            ans = true;
            li.remove();
          }
          break;
        }
        case 0: {
          const left = this.getLeft(this.getKey(idx));
          if (left < 0) {
            ans = true;
            li.remove();
          }
          break;
        }
      }
    }
    return ans;
  }

  getIndex() {
    const { count, r, location, } = this;
    const time = Math.floor(count / 2) + 1;
    let ans;
    if (count === 0) {
      ans = location;
    } else {
      switch (r) {
        case 0:
          ans = location - time;
          break;
        case 1:
          ans = location + time;
          break;
      }
    }
    return ans;
  }

  addItem(t) {
    const { ul, template, id, } = this;
    const idx = this.getIndex();
    const d = this.props.data[idx];
    if (d !== undefined) {
      this.idx = idx;
      const { item, } = this;
      const li = renderToNode(item);
      switch (t) {
        case 2: {
          ul.append(li);
          break;
        }
        case 1: {
          ul.append(li);
          this.right = idx;
          break;
        }
        case 0: {
          ul.prepend(li);
          this.left = idx;
          break;
        }
      }
      this.li = li;
      createPortal(li, ul);
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  render() {
    const { id, list, } = this;
    return(
      <ul id={id} className={style.pointDynamicLine} />
    );
  }
}

export default PointDynamiceLine;
