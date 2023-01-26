import React from 'react';

class PointLine extends React.Component {
  constructor(props) {
    super(props);
    const { data, } = this.props;
    this.empty = 0;
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
    this.left = ul.offsetLeft;
    this.setLocation(0);
  }

  clean() {
    this.widths = {};
    this.doms = {};
  }

  setLocation(location) {
    const { ul, } = this;
    ul.innerHTML = '';
    this.clean();
    this.location = location;
    this.type = 0;
    this.num = 0;
    this.count = 0;
    this.addItem(2);
    this.count += 1;
    ul.style.visibility = 'hidden';
    while (true) {
      const { count, } = this;
      this.r = count % 2;
      const { r, } = this;
      const { num, } = this;
      if (count > this.props.data.length - 1) {
        break;
      }
      if (this.type === 3) {
        break;
      }
      this.addItem(r);
      if (this.detectEdge()) {
        break;
      }
      this.count += 1;
    }
    ul.style.visibility = 'visible';
  }

  setType(t) {
    const { type, } = this;
    switch (t) {
      case 'l': {
        if (Math.floor(type / 2) !== 1) {
          this.type += 2;
        }
        break;
      }
      case 'r': {
        if (type % 2 !== 1) {
          this.type += 1;
        }
        break;
      }
    }
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
      const dom = this.getDom(key);
      if (dom) {
        widths[key] = dom.clientWidth;
      }
    }
    return widths[key];
  }

  getLeft(key) {
    const dom = this.getDom(key);
    if (dom) {
      return dom.offsetLeft;
    }
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
    const { r, idx, isUpdate, } = this;
    if (idx !== undefined && isUpdate) {
      switch (r) {
        case 1: {
          const { right, } = this;
          if (right !== undefined) {
            const right = this.getRight(this.getKey(idx));
            if (right > this.width || right === 0) {
              ans = true;
              const { li, } = this;
              li.remove();
              this.num -= 1;
              global.right = this.idx - 1;
            }
          }
          break;
        }
        case 0: {
          const { left, } = this;
          if (left !== undefined) {
            const left = this.getLeft(this.getKey(idx));
            if (left < this.left || left === 0) {
              const { li, } = this;
              ans = true;
              li.remove();
              this.num -= 1;
              this.left = this.idx + 1;
            }
          }
          break;
        }
      }
    }
    return ans;
  }

  getIndex() {
    const { count, r, location, } = this;
    const time = Math.floor((count - 1) / 2) + 1;
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
}

export default PointLine;
