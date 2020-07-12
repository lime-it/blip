@lime.it/blip
=============

Project facilitator for people with little time and little desire to work

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@lime.it/blip.svg)](https://npmjs.org/package/@lime.it/blip)
[![CircleCI](https://circleci.com/gh/lime-it/blip/tree/master.svg?style=shield)](https://circleci.com/gh/lime-it/blip/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@lime.it/blip.svg)](https://npmjs.org/package/@lime.it/blip)
[![License](https://img.shields.io/npm/l/@lime.it/blip.svg)](https://github.com/lime-it/blip/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @lime.it/blip
$ blip COMMAND
running command...
$ blip (-v|--version|version)
@lime.it/blip/0.2.3 win32-x64 node-v10.16.0
$ blip --help [COMMAND]
USAGE
  $ blip COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`blip hello [FILE]`](#blip-hello-file)
* [`blip help [COMMAND]`](#blip-help-command)

## `blip hello [FILE]`

describe the command here

```
USAGE
  $ blip hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ blip hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\hello.ts)_

## `blip help [COMMAND]`

display help for blip

```
USAGE
  $ blip help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src\commands\help.ts)_
<!-- commandsstop -->
