import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.module.css';
import renderToNode from '~/script/lib/renderToNode';
import RegionList from '~/script/component/RegionList';
import check from '~/script/lib/check';

class RegionDynamicList extends RegionList {
  constructor(props) {
    super(props);
    this.type = 0;
    this.roots = {};
  }

  async dealScroll(e) {
    const {
      status: {
        scrollTop,
      },
      id,
      ul,
    } = this;
    if (ul.scrollTop > scrollTop) {
      this.type = 1;
      await this.updateView('d');
      if (this.status.first >= 0) {
        await this.syncRemove('d');
      }
    } else if (ul.scrollTop < scrollTop) {
      const {
        status: {
          last,
        }
      } = this;
      this.type = 0;
      await this.updateView('u');
      if (last < this.props.data.length) {
        await this.syncRemove('u');
      }
    }
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000 / 29);
    });
    let diffScroll = this.status.scrollTop - ul.scrollTop;
    while (true) {
      if (Math.abs(diffScroll) <= 45) {
        if (Math.abs(diffScroll) > 0) {
          ul.scrollIntoView(this.status.scrollTop + diffScroll);
        }
        break;
      } else {
        diffScroll = diffScroll / 2;
      }
    }
    this.status.scrollTop = ul.scrollTop;
  }

  async initLast() {
    const { top, bottom, } = this.status;
    if (bottom - top > 0) {
      await this.syncInsert(0, 'd');
      this.status.last = 0;
    }
  }

  async updateView(t) {
    switch (t) {
      case 'd':
        await this.downView();
        break;
      case 'u':
        await this.upView();
        break;
    }
  }

  async downView() {
    const { last, } = this.status;
    if (last < this.props.data.length) {
      const top = this.getDomDownTop(this.getKey(last));
      const { status, } = this;
      if (top <= status.bottom) {
        if (last + 1 < this.props.data.length) {
          await this.addDownItem(last + 1);
          await this.downView();
        }
      }
    }
  }

  async addDownItem(k) {
    await this.syncInsert(k, 'd');
    if (k < this.props.data.length) {
      this.status.last = k;
    }
  }

  async upView() {
    const { status, } = this;
    const { first, } = status;
    let count = 0;
    if (first >= 0) {
      const bottom = this.getDomUpBottom(this.getKey(first));
      if (bottom >= status.top) {
        if (first - 1 >= 0) {
          count += 1;
          await this.addUpItem(first - 1);
          this.upView();
        }
      }
    }
  }

  async addUpItem(k) {
    await this.syncInsert(k, 'u');
    if (k >= 0) {
      this.status.first = k;
    }
  }

  async syncRemove(t) {
    switch (t) {
      case 'u': {
        const { status, } = this;
        const k = status.last;
        if (k < this.props.data.length) {
          const top = this.getDomUpTop(this.getKey(k));
          const { id, ul, } = this;
          if (top >= this.getHeight(ul, id)) {
            const dom = this.getDom(this.getKey(k));
            dom.remove();
            this.doms[this.getKey(k)] = undefined;
            this.status.last = k - 1;
          }
        }
        break;
      }
      case 'd': {
        const { status, } = this;
        const k = status.first;
        if (k >= 0) {
          const bottom = this.getDomDownBottom(this.getKey(k));
          if (bottom < status.top - 4) {
            const dom = this.getDom(this.getKey(k));
            dom.remove();
            this.doms[this.getKey(k)] = undefined;
            this.status.first = k + 1;
          }
        }
        break;
      }
    }
  }

  getDomUpTop(key) {
    const dom = this.getDom(key);
    let top = undefined;
    if (dom) {
      const { ul, } = this;
      return dom.offsetTop - ul.scrollTop;
    }
  }

  getDomUpBottom(key) {
    const top = this.getDomUpTop(key);
    const dom = this.getDom(key);
    const { ul, } = this;
    const height = this.getHeight(ul, key);
    return top + height;
  }

  getDomDownTop(key) {
    const dom = this.getDom(key);
    if (dom) {
      const offsetTop = dom.offsetTop;
      const { id, } = this;
      const ul = this.getDom(id);
      const scrollTop = ul.scrollTop;
      return offsetTop - scrollTop;
    }
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

  checkDom(key) {
    let ans = false;
    if (document.getElementById(key) !== null) {
      const dom = document.getElementById(key);
      if (dom) {
        ans = true;
      }
    }
    return ans;
  }

  async syncInsert(i, t) {
    const e = this.props.data[i];
    if (e) {
      const { id, ul, } = this;
      const k = id + i;
      const { field, string, } = e;
      const component = <div>{e}</div>;
      const li = renderToNode(<li id={k} key={i} />);
      if (document.getElementById(k) === null) {
        switch (t) {
          case 'd':
            ul.append(li);
            break;
          case 'u':
            ul.prepend(li);
            break;
        }
        this.renderElement(li, component, id);
        await check(() => this.checkDom(k));
      }
    }
  }

  render() {
    const { id, } = this;
    return(
      <ul id={id} className={style.regionDynamicList} />
    );
  }
}

export default RegionDynamicList;
