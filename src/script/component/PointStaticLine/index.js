import React from 'react';
import { renderToStaticMarkup, } from 'react-dom/server';
import style from './index.module.css';
import Template from '~/script/component/Template';

class PointStaticLine extends React.Component {
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
    this.template = document.getElementById(id + 't');
    this.setLocation(0);
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
      const component = <li id={this.getKey(idx)} key={idx}>{d}</li>;
      template.innerHTML = renderToStaticMarkup(component);
      const li = this.getDom(this.getKey(idx));
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
      template.innerHTML = '';
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  render() {
    const { id, } = this;
    return([
      <Template id={id + 't'} />,
      <ul id={id} className={style.pointStaticLine} />,
    ]);
  }
}

export default PointStaticLine;
