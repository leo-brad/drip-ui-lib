import TestRenderer from 'react-test-renderer';
import { describe, expect, test, } from '@jest/globals';
import React from 'react';
import Router from '~/script/component/Router';

describe('[component] Router', () => {
  test('router render result should correct.', () => {
    const router = <Router />;
    expect(TestRenderer.create(<Router />).toJSON()).toBe(null);
  });
});
