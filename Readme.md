# node-smartcash
[![npm](https://img.shields.io/badge/npm-1.1.0-blue.svg)](https://npmjs.org/package/node-smartcash)

node-smartcash is based on [node-bitcoin](https://github.com/freewil/node-bitcoin) with modifications to disable SSL, to allow an array of command parameters, and to update the list of API commands (based on the [official list of SmartCash console commands](https://smartcash.freshdesk.com/support/solutions/articles/35000027144-debug-console-command-line)). You can either use the CamelCase method on the `smartcash.Client` object (methods are listed in [lib/commands.js](/lib/commands.js)) or use the `cmd` method directly. More information about JSON-RPC usage for SmartCash core can be found in the [SmartCash config file reference](https://smartcash.freshdesk.com/support/solutions/articles/35000038702-smartcash-conf-configuration-file) (search "JSON-RPC options"). More information about a particular command can be found via Help > Debug Window > Console in SmartCash Core by using `help [command]` where [command] is the command in lowercase.

node-smartcash is best used as a dependency in a project that will communicate with a SmartCash Core instance on the same machine. For an example see [SmartSweeper](https://github.com/swiftlettech/smart-sweeper).

## Install

`npm install node-smartcash`

## Examples

`const smartcash = require('node-smartcash')`

### Create client
```js
// all config options are optional
var client = new smartcash.Client({
  host: 'localhost',
  port: 9678,
  user: 'username',
  pass: 'password',
  timeout: 30000
});
```

### Get the balance across all accounts with a minimum number of 6 confirmations for all transactions

```js
client.getBalance(['*', 6], function(error, response, resHeaders) {
  if (error) console.log('Error: ', error);
  console.log('Balance: ', response);
});
```
### Getting the balance directly using `cmd`

```js
client.cmd('getbalance', ['*', 6], function(error, response, resHeaders){
  if (error) console.log('Error: ', error);
  console.log('Balance: ', response);
});
```

### Get information about a command

```js
client.help(['getbalance'], function(error, response, resHeaders) {
  if (error) console.log('Error: ', error);
  console.log(response);
});
```
### Getting information about a command directly using `cmd`

```js
client.cmd('help', ['getbalance'], function(error, response, resHeaders){
  if (error) console.log('Error: ', error);
  console.log(response);
});
```

## SSL

Unlike the original node-bitcoin, connecting to a remote bitcoind instance, using JSON-RPC over SSL to connect to a remote SmartCash Core instance isn't supported.


## Tests

`npm test`

To run the tests you must have [SmartCash core installed](https://smartcash.cc/wallets/) and configured to accept RPC commands. The rpcuser and rpcpassword in the SmartCash config file (smartcash.conf) must match user and pass in [test/config.js](test/config.js). See the [SmartCash config file reference](https://smartcash.freshdesk.com/support/solutions/articles/35000038702-smartcash-conf-configuration-file) (search "JSON-RPC options") for more information.
