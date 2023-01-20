import React from 'react';
import style from './index.module.css';
import renderToNode from '~/script/lib/renderToNode';
import RegionList from '~/script/component/RegionList';

class RegionStaticList extends RegionList {
  constructor(props) {
    super(props);
  }

  syncInsert(i, t) {
    const e = this.props.data[i];
    if (e) {
      const { id, ul, } = this;
      const k = id + i;
      const li = renderToNode(<li id={k} className={style.item} key={i}>{e}</li>);
      switch (t) {
        case 'd':
          ul.append(li);
          break;
        case 'u':
          ul.prepend(li);
          break;
      }
    }
  }

  render() {
    const { id, } = this;
    return(
      <ul id={id} className={style.regionStaticList} />
    );
  }
}

export default RegionStaticList;
