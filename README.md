blip
====

Project facilitator for people with little time and little desire to work

[![Version](https://img.shields.io/npm/v/@lime.it/blip)](https://www.npmjs.com/package/@lime.it/blip)
[![License](https://img.shields.io/npm/l/@lime.it/blip)](https://github.com/lime-it/blip/blob/master/LICENSE)

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
@lime.it/blip/0.2.2 win32-x64 node-v10.16.0
$ blip --help [COMMAND]
USAGE
  $ blip COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`blip config:machine [LINKNAME]`](#blip-configmachine-linkname)
* [`blip destroy`](#blip-destroy)
* [`blip down [LINKNAME]`](#blip-down-linkname)
* [`blip env [LINKNAME]`](#blip-env-linkname)
* [`blip help [COMMAND]`](#blip-help-command)
* [`blip link [LINKNAME]`](#blip-link-linkname)
* [`blip ls`](#blip-ls)
* [`blip new [PROJECTNAME]`](#blip-new-projectname)
* [`blip registry:down`](#blip-registrydown)
* [`blip registry:init`](#blip-registryinit)
* [`blip registry:remove`](#blip-registryremove)
* [`blip registry:up`](#blip-registryup)
* [`blip unlink [LINKNAME]`](#blip-unlink-linkname)
* [`blip up [LINKNAME]`](#blip-up-linkname)

## `blip config:machine [LINKNAME]`

describe the command here

```
USAGE
  $ blip config:machine [LINKNAME]

OPTIONS
  -h, --help  show CLI help
  --id=id     index of the desired machine
```

_See code: [src\commands\config\machine.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\config\machine.ts)_

## `blip destroy`

describe the command here

```
USAGE
  $ blip destroy

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\destroy.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\destroy.ts)_

## `blip down [LINKNAME]`

describe the command here

```
USAGE
  $ blip down [LINKNAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\down.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\down.ts)_

## `blip env [LINKNAME]`

describe the command here

```
USAGE
  $ blip env [LINKNAME]

OPTIONS
  -h, --help     show CLI help
  --shell=shell  [default: bash]
```

_See code: [src\commands\env.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\env.ts)_

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

## `blip link [LINKNAME]`

describe the command here

```
USAGE
  $ blip link [LINKNAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\link.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\link.ts)_

## `blip ls`

describe the command here

```
USAGE
  $ blip ls

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\ls.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\ls.ts)_

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

_See code: [src\commands\new.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\new.ts)_

## `blip registry:down`

describe the command here

```
USAGE
  $ blip registry:down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\down.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\registry\down.ts)_

## `blip registry:init`

describe the command here

```
USAGE
  $ blip registry:init

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\init.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\registry\init.ts)_

## `blip registry:remove`

describe the command here

```
USAGE
  $ blip registry:remove

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\remove.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\registry\remove.ts)_

## `blip registry:up`

describe the command here

```
USAGE
  $ blip registry:up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\registry\up.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\registry\up.ts)_

## `blip unlink [LINKNAME]`

describe the command here

```
USAGE
  $ blip unlink [LINKNAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\unlink.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\unlink.ts)_

## `blip up [LINKNAME]`

describe the command here

```
USAGE
  $ blip up [LINKNAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\up.ts](https://github.com/lime-it/blip/blob/v0.2.2/src\commands\up.ts)_
<!-- commandsstop -->
