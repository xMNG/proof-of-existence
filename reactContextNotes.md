install drizzle
`npm install -save drizzle`

install drizzle-react
`npm install -save drizzle-react`

set up new build dir inside react app
```
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts")
};
```