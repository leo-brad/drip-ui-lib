import React from 'react';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.route =  {};
    this.component = {};
    this.state = {
      location: '/',
    };
  }

  addRoute(path, component) {
    const { route, } = this;
    if (route[path] === undefined) {
      route[path] = component;
    }
    return route[path];
  }

  getPage(path) {
    const { component, } = this;
    if (component[path] === undefined) {
      const Page = this.route[path];
      if (Page) {
        component[path] = <Page />;
      } else {
        component[path] = null;
      }
    }
    return component[path];
  }

  render() {
    const { location, } = this.state;
    return this.getPage(location);
  }
}

export default Router;
