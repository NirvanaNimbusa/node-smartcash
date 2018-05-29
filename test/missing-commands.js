/* global describe, it */

var assert = require('assert')
var smartcash = require('../')
var config = require('./config')
var commands = require('../lib/commands')

var getHelpCommands = function (client, cb) {
  var commandRegex = /^([a-z]+)/
  client.cmd('help', function (err, commandList) {
    if (err) return cb(err)

    var helpCommands = []

    // split up the command list by newlines
    var commandListLines = commandList.split('\n')
    var result
    for (var i in commandListLines) {
      result = commandRegex.exec(commandListLines[i])
      if (!result) continue
      helpCommands.push(result[1])
    }
    cb(null, helpCommands)
  })
}

describe('Client Commands', function () {
  it('should have all the commands listed by `help`', function (done) {
    var client = new smartcash.Client(config)
    getHelpCommands(client, function (err, helpCommands) {
      assert.ifError(err)

      for (var i in helpCommands) {
        var found = false
        for (var j in commands) {
          if (commands[j] === helpCommands[i]) {
            found = true
            break
          }
        }
          
        // ignore walletlock, walletpassphrase, and walletpassphrasechange in help because they are hidden
        // if the wallet isn't encrypted and ignore encryptwallet because it's hidden if the wallet is encrypted
        var ignore = ['encryptwallet', 'walletlock', 'walletpassphrase', 'walletpassphrasechange']
        if (~ignore.indexOf(helpCommands[i]))
          assert.ok(!found, 'missing command not found in `help`: ' + helpCommands[i])
        else
          assert.ok(found, 'missing command found in `help`: ' + helpCommands[i])
      }

      done()
    })
  })

  it('should not have any commands not listed by `help`', function (done) {
    var client = new smartcash.Client(config)
    getHelpCommands(client, function (err, helpCommands) {
      assert.ifError(err)

      for (var i in commands) {
        var found = false
        for (var j in helpCommands) {
          if (commands[i] === helpCommands[j]) {
            found = true
            break
          }
        }

        // ignore walletlock, walletpassphrase, and walletpassphrasechange in help because they are hidden
        // if the wallet isn't encrypted and ignore encryptwallet because it's hidden if the wallet is encrypted
        var ignore = ['encryptwallet', 'walletlock', 'walletpassphrase', 'walletpassphrasechange']
        if (~ignore.indexOf(commands[i])) {
          assert.ok(!found, 'command found in `help`: ' + commands[i])
        } else {
          assert.ok(found, 'command not found in `help`: ' + commands[i])
        }
      }

      done()
    })
  })
})
