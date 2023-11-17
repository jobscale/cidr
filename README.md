# @jobscale/cidr

## Installation

```
npm i @jobscale/cidr
```

## Examples

### has

```javascript
const { Cidr } = require('@jobscale/cidr');

new Cidr('0.0.0.0/0').has('160.160.160.160')

new Cidr('160.160.160.160/32').has('160.160.160.160')

new Cidr('160.160.160.160').has('160.160.160.160');

new Cidr([
  '172.16.0.0/12',
  '160.160.160.160/30',
]).has('160.160.160.160');
```

## Jest test
```
git clone https://github.com/jobscale/cidr.git jobscale-cidr
cd $_
npm test
```
