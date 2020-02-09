blip
====

Project facilitator for people with little time and little desire to work

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/blip.svg)](https://npmjs.org/package/blip)
[![Downloads/week](https://img.shields.io/npm/dw/blip.svg)](https://npmjs.org/package/blip)
[![License](https://img.shields.io/npm/l/blip.svg)](https://github.com/lime-it/lime-it/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g blip
$ blip COMMAND
running command...
$ blip (-v|--version|version)
blip/1.0.0 win32-x64 node-v10.16.0
$ blip --help [COMMAND]
USAGE
  $ blip COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`blip config:machine`](#blip-configmachine)
* [`blip down`](#blip-down)
* [`blip help [COMMAND]`](#blip-help-command)
* [`blip new [PROJECTNAME]`](#blip-new-projectname)
* [`blip registry:down`](#blip-registrydown)
* [`blip registry:init`](#blip-registryinit)
* [`blip registry:remove`](#blip-registryremove)
* [`blip registry:up`](#blip-registryup)
* [`blip remove [FILE]`](#blip-remove-file)
* [`blip up`](#blip-up)

## `blip config:machine`

describe the command here

```
USAGE
  $ blip config:machine

OPTIONS
  -h, --help  show CLI help
  --id=id     index of the desired machine
```

_See code: [src\commands\config\machine.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\config\machine.ts)_

## `blip down`

describe the command here

```
USAGE
  $ blip down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\down.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\down.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_

## `blip new [PROJECTNAME]`

describe the command here

```
USAGE
  $ blip new [PROJECTNAME]

OPTIONS
  -h, --help                 show CLI help
  --localmirror              Use local docker registry mirror
  --machinename=machinename  Docker machine name for the project
  --mirror=mirror            Use docker registry mirror
```

_See code: [src\commands\new.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\new.ts)_

## `blip registry:down`

describe the command here

```
USAGE
  $ blip registry:down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\down.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\registry\down.ts)_

## `blip registry:init`

describe the command here

```
USAGE
  $ blip registry:init

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\init.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\registry\init.ts)_

## `blip registry:remove`

describe the command here

```
USAGE
  $ blip registry:remove

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\remove.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\registry\remove.ts)_

## `blip registry:up`

describe the command here

```
USAGE
  $ blip registry:up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\up.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\registry\up.ts)_

## `blip destroy [FILE]`

describe the command here

```
USAGE
  $ blip destroy [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\destroy.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\destroy.ts)_

## `blip up`

describe the command here

```
USAGE
  $ blip up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\up.ts](https://github.com/lime-it/lime-it/blob/v1.0.0/src\commands\up.ts)_
<!-- commandsstop -->
