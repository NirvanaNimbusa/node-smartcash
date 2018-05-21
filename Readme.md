# node-smartcash

node-smartcash is based on [node-bitcoin](https://github.com/freewil/node-bitcoin) with modifications to allow an array of parameters and to update the list of API commands (based on the [official SmartCash console commands](https://smartcash.freshdesk.com/support/solutions/articles/35000027144-debug-console-command-line)). You can either use the camelcase method on the `smartcash.Client` object (methods are listed in [lib/commands.js](/lib/commands.js)) or use the `cmd` method directly. More information about JSON-RPC usage for SmartCash core can be found in the [SmartCash config file reference](https://smartcash.freshdesk.com/support/solutions/articles/35000038702-smartcash-conf-configuration-file) (search "JSON-RPC options").

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
client.getBalance(['*', 6], function(err, response, resHeaders) {
  if (err) return console.log(err);
  console.log('Balance: ', response);
});
```
### Getting the balance directly using `cmd`

```js
client.cmd('getbalance', ['*', 6], function(err, response, resHeaders){
  if (err) return console.log(err);
  console.log('Balance: ', response);
});
```

## SSL

It isn't recommended to use JSON-RPC over SSL to connect to a remote SmartCash core instance. See [Enabling SSL on original client](https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon) for more information.