import 'react-dom/server';
import { describe, expect, test, } from '@jest/globals';
import React from 'react';
import Router from '~/script/component/Router';

describe('[component] Router', () => {
  test('router render result should correct.', () => {
    const router = <Router />;
    //router.addRoute('/', <div>Home</div>);
    expect(ReactDOM.renderToStaticMarkup(<Router />)).toBe('ifsadfasd');
  });
});
