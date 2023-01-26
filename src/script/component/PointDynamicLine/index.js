import React from 'react';
import style from './index.module.css';
import PointLine from '~/script/component/PointLine';
import renderToNode from '~/script/lib/renderToNode';
import check from '~/script/lib/check';
import ReactDOM from 'react-dom/client';

class PointDynamiceLine extends PointLine {
  constructor(props) {
    super(props);
    this.empty = 0;
    this.roots = {};
    this.checkDivs = this.checkDivs.bind(this);
    this.checkEmpty = this.checkEmpty.bind(this);
    this.checkDom = this.checkDom.bind(this);
    this.checkDiv = this.checkDiv.bind(this);
  }

  clean() {
    this.widths = {};
    this.doms = {};
  }

  checkDom(key) {
    const dom = document.getElementById(key);
    let ans = false;
    if (dom !== null) {
      ans = true;
    }
    return ans;
  }

  async getDom(key) {
    const { doms, } = this;
    if (doms[key] === undefined) {
      await check(() => this.checkDom(key));
      doms[key] = document.getElementById(key);
    }
    return doms[key];
  }

  checkDiv(li) {
    const button = li.children[0];
    let ans = false;
    if (button && button.tagName === 'div'.toUpperCase()) {
      ans = true;
    }
    return ans;
  }

  async getWidth(key) {
    const { widths, } = this;
    if (widths[key] === undefined) {
      const dom = await this.getDom(key);
      if (dom) {
        await check(() => this.checkDiv(dom));
        widths[key] = dom.clientWidth;
      }
    }
    return widths[key];
  }

  async getLeft(key) {
    const dom = await this.getDom(key);
    if (dom) {
      return dom.offsetLeft;
    }
  }

  async getRight(key) {
    const width = await this.getWidth(key);
    const left = await this.getLeft(key);
    return left + width;
  }

  checkEmpty() {
    const { ul, } = this;
    return ul.children.length === 0;
  }

  checkDivs() {
    const { id, } = this;
    const ul = document.getElementById(id);
    let ans = false;
    if (ul) {
      let time = 0;
      for (let li of ul.children) {
        const child = li.children[0];
        if (child) {
          if (child.tagName === 'div'.toUpperCase()) {
            time += 1;
            const { num, } = this;
            if (time === num) {
              ans = true;
              break;
            }
          }
        }
      }
    }
    return ans;
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
        const component = <div>{d}</div>;
        const node = renderToNode(<li id={id} />);
        switch (t) {
          case 2: {
            ul.append(node);
            this.left = undefined;
            this.right = undefined;
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
        this.renderElement(li, component, id);
        this.isUpdate = true;
        this.num += 1;
      } else {
        this.isUpdate = false;
      }
    }
  }

  async setLocation(location) {
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
      if (num > this.props.data.length - 1) {
        break;
      }
      if (this.type === 3) {
        break;
      }
      this.addItem(r);
      const flag = await this.detectEdge();
      if (flag) {
        break;
      }
      this.count += 1;
    }
    await check(this.checkDivs);
    this.clearEmpty();
    ul.style.visibility = 'visible';
  }

  clearEmpty() {
    const { ul, } = this;
    for (const child of ul.children) {
      if (child.tagName === 'li'.toUpperCase()) {
        const button = child.children[0];
        if (button === undefined) {
          child.remove();
        }
      }
    }
  }

  async detectEdge() {
    let ans = false;;
    const { r, idx, isUpdate, } = this;
    if (idx !== undefined && isUpdate) {
      switch (r) {
        case 1: {
          const { right, } = this;
          if (right !== undefined) {
            const right = await this.getRight(this.key);
            if (right > this.width || right === 0) {
              ans = true;
              const { li, } = this;
              li.remove();
              this.num -= 1;
              this.right = this.idx - 1;
            }
          }
          break;
        }
        case 0: {
          const { left, }= this;
          if (left !== undefined) {
            const left = await this.getLeft(this.key);
            if (left < this.left || left === 0) {
              ans = true;
              const { li, } = this;
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

  renderElement(container, component, id) {
    if (container) {
      const { roots, } = this;
      let root;
      if (roots[id] === undefined) {
        root = ReactDOM.createRoot(container);
      } else {
        root = roots[id];
      }
      root.render(component);
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
