import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.module.css';
import renderToNode from '~/script/lib/renderToNode';
import RegionList from '~/script/component/RegionList';

class RegionDynamicList extends RegionList {
  constructor(props) {
    super(props);
  }

  syncInsert(i, t) {
    const e = this.props.data[i];
    if (e) {
      const { id, ul, } = this;
      const k = id + i;
      const component = <div className={style.item} key={i}>{e}</div>;
      const li = renderToNode(<li id={k} key={i} />);
      switch (t) {
        case 'd':
          ul.append(li);
          break;
        case 'u':
          ul.prepend(li);
          break;
      }
      const root = ReactDOM.createRoot(li);
      root.render(component);
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
