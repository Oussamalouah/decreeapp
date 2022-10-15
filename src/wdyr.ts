import React from 'react';

// for performance instrumentation
// read more: https://github.com/welldone-software/why-did-you-render
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line node/no-unpublished-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
