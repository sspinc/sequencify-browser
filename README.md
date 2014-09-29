[![Build Status](https://travis-ci.org/gergelyke/sequencify-browser.png)](https://travis-ci.org/gergelyke/sequencify-browser)

[![browser support](https://ci.testling.com/gergelyke/sequencify-browser.png)
](https://ci.testling.com/gergelyke/sequencify-browser)

## Sequencify-browser

A module for sequencing tasks and dependencies in the browser with browserify

```
npm install sequencify-browser
```

### Usage

```javascript
var sequencify = require('sequencify-browser');

var items = {
  a: {
    name: 'a',
    dep: []
    // other properties as needed
  },
  b: {
    name: 'b',
    dep: ['a']
  },
  c: {
    name: 'c',
    dep: ['a']
  },
  d: {
    name: 'd',
    dep: ['c']
  },
};

var names = ['d', 'b', 'c', 'a']; // The names of the items you want arranged, need not be all

var results = sequencify(items, names);

console.log(results.sequence);
// ['a','b','c','d'];
```

## Credits

The original repo for node can be found here: https://github.com/robrich/sequencify
