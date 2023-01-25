# @jobscale/cidr

## Installation

```
npm i @jobscale/cidr
```

## Examples

### has

```javascript
const { Cidr } = require('@jobscale/cidr');

logger.info(new Cidr('0.0.0.0/0').has('160.160.160.160'), 'toBe', true);
```

```javascript
const { Cidr } = require('@jobscale/cidr');

logger.info(new Cidr('160.160.160.160/32').has('160.160.160.160'), 'toBe', true);
```

```javascript
const { Cidr } = require('@jobscale/cidr');

logger.info(new Cidr('160.160.160.160').has('160.160.160.160'), 'toBe', true);
```

## Jest test
```
git clone https://github.com/jobscale/cidr.git jobscale-cidr
cd $_
npm test
```
