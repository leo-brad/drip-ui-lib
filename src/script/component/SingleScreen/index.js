import React from 'react';
import { renderToStaticMarkup, } from 'react-dom/server';
import style from './index.module.css';

class SingleScreen extends React.Component {
  constructor(props) {
    super(props);
    const { data, } = this.props;

    const id = new Date().getTime();
    this.id = id;

    this.doms = [];
    this.heights = [];
  }

  componentDidMount() {
    const { id, } = this;

    const ul = document.getElementById(id);
    this.ul = ul;

    const template = document.getElementById(id.toString() + 't');
    this.template = template;

    const scrollTop = ul.scrollTop;
    const height = ul.clientHeight;
    const status = {
      first: 0,
      top: scrollTop,
      bottom: scrollTop + height,
      scrollTop: ul.scrollTop,
    };
    this.status = status;
    this.initLast();
    this.bindEvent();
    this.updateView('d');
  }

  bindEvent() {
    const { ul, } = this;
    let f = true;
    ul.addEventListener('scroll', (e) => {
      if (f = true) {
        f = false;
        setTimeout(() => {
          f = true;
        }, 1000 / 29);
        const {
          status: {
            scrollTop,
          },
          id,
        } = this;
        if (ul.scrollTop > scrollTop) {
          this.updateView('d');
          if (this.status.first >= 0) {
            const bottom = this.getDomScrollBottom(this.status.first);
            if (this.status.scrollTop >= bottom) {
              this.syncRemove('d');
              if (this.status.first < this.props.data.length - 1) {
                this.status.first += 1;
              }
            }
          }
        } else if (ul.scrollTop < scrollTop) {
          const {
            status: {
              last,
            }
          } = this;
          this.updateView('u');
          if (last < this.props.data.length && last >= 0) {
            const li = this.getDom(last);
            if (li) {
              const top = li.offsetTop;
              if (top >= this.status.bottom) {
                this.syncRemove('u');
                this.status.last -= 1;
              }
            }
          }
        }
        this.status.scrollTop = ul.scrollTop;
      }
    });
  }

  updateView(t) {
    switch (t) {
      case 'd':
        this.downView();
        this.addDownItem(this.status.last + 1);
        break;
      case 'u':
        this.upView();
        this.addUpItem(this.status.first - 1);
        break;
    }
  }

  getDom(key) {
    const { id, doms, } = this;
    const k = id.toString() + key;
    if (doms[key] === undefined) {
      doms[key] = document.getElementById(k);
    }
    return doms[key];
  }

  getHeight(dom, key) {
    const { heights, } = this;
    if (heights[key] === undefined) {
      heights[key] = dom.clientHeight;
    }
    return heights[key];
  }

  initLast() {
    const { top, bottom, } = this.status;
    if (bottom - top > 0) {
      this.syncInsert(0, 'd');
      this.status.last = 0;
    }
  }

  initFirst() {
    while (true) {
      const {
        status: {
          first,
        }
      } = this;
      const top = this.getDom(first).scrollTop;
      if (top <= this.status.top) {
        this.status.first -= 1;
        break;
      }
    }
  }

  getDomOffsetBottom(key) {
    const dom = this.getDom(key);
    if (dom) {
      const offsetTop = dom.offsetTop;
      const height = this.getHeight(dom, key);
      return offsetTop + height;
    }
  }

  getDomScrollBottom(key) {
    const dom = this.getDom(key);
    if (dom) {
      const scrollTop = dom.scrollTop;
      const height = this.getHeight(dom, key);
      return scrollTop+ height;
    }
  }

  downView() {
    const { status, } = this;
    const { last, } = status;
    if (last < this.props.data.length) {
      const bottom = this.getDomOffsetBottom(last);
      if (bottom <= status.bottom) {
        this.addDownItem(last + 1);
        this.downView();
      }
    }
  }

  addDownItem(k) {
    this.syncInsert(k, 'd');
    if (k < this.props.data.length) {
      this.status.last = k;
    }
  }

  upView() {
    const { status, } = this;
    const { first, } = status;
    if (first >= 0) {
      const dom = this.getDom(first);
      if (dom) {
        const top = dom.scrollTop;
        if (top > status.top) {
          this.addUpItem(first - 1);
          this.upView();
        }
      }
    }
  }

  addUpItem(k) {
    this.syncInsert(k, 'u');
    if (k >= 0) {
      this.status.first = k;
    }
  }

  syncRemove(t) {
    switch (t) {
      case 'u': {
        const { status, } = this;
        const k = status.last;
        if (k < this.props.data.length) {
          const top = this.getDom(k).offsetTop;
          if (top >= this.status.bottom) {
            const { id, } = this;
            this.getDom(k).remove();
            this.doms[k] = undefined;
          }
        }
        break;
      }
      case 'd': {
        const { status, } = this;
        const k = status.first - 1;
        if (k >= 0) {
          const bottom = this.getDomScrollBottom(k);
          if (this.status.scrollTop >= bottom) {
            const { id, } = this;
            const li = this.getDom(k).remove();
            this.doms[k] = undefined;
          }
        }
        break;
      }
    }
  }

  syncInsert(i, t) {
    const e = this.props.data[i];
    if (e) {
      const { id, template, ul, } = this;
      const k = id.toString() + i;
      template.innerHTML = renderToStaticMarkup(
        <li id={k} className={style.item} key={i}>{e}</li>
      );
      const li = document.getElementById(k);
      switch (t) {
        case 'd':
          ul.append(li);
          break;
        case 'u':
          ul.prepend(li);
          break;
      }
      template.innerHTML = '';
    }
  }

  render() {
    const { id, } = this;
    return([
      <div id={id.toString() + 't'} className={style.template}></div>,
      <ul id={id} className={style.singleScreen}>
      </ul>
    ]);
  }
}

export default SingleScreen;
