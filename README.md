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

```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`blip config:machine`](#blip-configmachine)
* [`blip destroy`](#blip-destroy)
* [`blip down`](#blip-down)
* [`blip help [COMMAND]`](#blip-help-command)
* [`blip new [PROJECTNAME]`](#blip-new-projectname)
* [`blip registry:down`](#blip-registrydown)
* [`blip registry:init`](#blip-registryinit)
* [`blip registry:remove`](#blip-registryremove)
* [`blip registry:up`](#blip-registryup)
* [`blip up`](#blip-up)

## `blip config:machine`

Get the docker-machine name for the current project.

```
USAGE
  $ blip config:machine

OPTIONS
  -h, --help  show CLI help
  --id=id     index of the desired machine
```

_See code: [src/commands/config/machine.ts](https://github.com/lime-it/blip/blob/master/src/commands/config/machine.ts)_

## `blip destroy`

Destroys the environment of the project, removing the docker-machines and hosts file entries.

```
USAGE
  $ blip destroy

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/destroy.ts](https://github.com/lime-it/blip/blob/master/src/commands/destroy.ts)_

## `blip down`

Stops the project docker-machines

```
USAGE
  $ blip down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/down.ts](https://github.com/lime-it/blip/blob/master/src/commands/down.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `blip new [PROJECTNAME]`

Creates a new project, in a folder with the given name

```
USAGE
  $ blip new [PROJECTNAME]

OPTIONS
  -h, --help                 show CLI help
  --localmirror              Use local docker registry mirror
  --machinename=machinename  Docker machine name for the project
  --mirror=mirror            Use docker registry mirror
```

_See code: [src/commands/new.ts](https://github.com/lime-it/blip/blob/master/src/commands/new.ts)_

## `blip registry:down`

Stop the local docker hub registry mirror

```
USAGE
  $ blip registry:down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/registry/down.ts](https://github.com/lime-it/blip/blob/master/src/commands/registry/down.ts)_

## `blip registry:init`

Initialize the local docker hub registry mirror

```
USAGE
  $ blip registry:init

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/registry/init.ts](https://github.com/lime-it/blip/blob/master/src/commands/registry/init.ts)_

## `blip registry:remove`

Remove the local docker hub registry mirror

```
USAGE
  $ blip registry:remove

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/registry/remove.ts](https://github.com/lime-it/blip/blob/master/src/commands/registry/remove.ts)_

## `blip registry:up`

Start the local docker hub registry mirror

```
USAGE
  $ blip registry:up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/registry/up.ts](https://github.com/lime-it/blip/blob/master/src/commands/registry/up.ts)_

## `blip up`

Start the project docker-machines and sets the hosts entries.

```
USAGE
  $ blip up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/up.ts](https://github.com/lime-it/blip/blob/master/src/commands/up.ts)_
<!-- commandsstop -->
