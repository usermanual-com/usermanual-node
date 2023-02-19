# UserManual Node.js

Node.js wrapper for the [UserManual API](https://dashboard.usermanual.com/developers/api-docs)

## Installation

Install the package with:

```shell
npm install --save usermanual-api
```
or

```shell
yarn add usermanual-api
```

## Usage

### Table of Contents

- [Import](#import)
- [Authentication](#authentication)
- [Documents](#documents)

### Import

In JavaScript

```javascript
const { UserManual } = require('usermanual-api')
```

In TypeScript

```typescript 
import { UserManual } from 'usermanual-api';
```

### Authentication

Get the API key for your project from your UserManual Dashboard → Settings → API Keys.

```typescript
const usermanual = new UserManual({
  apiKey: 'YOUR API KEY',
});
```

### Usages with TypeScript

```typescript
import { UserManual } from 'usermanual-api';
const usermanual = new UserManual({
  apiKey: 'YOUR API KEY'
});

const getDocument = async () => {
  const document = await usermanual.getPDFDocument('55d18942-75c9-4ac6-b9eb-055b107ffa36');
};
getDocument();
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/usermanual-com/usermanual-node.

## License

The repository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
