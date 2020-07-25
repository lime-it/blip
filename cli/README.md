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
* [`blip destroy`](#blip-destroy)
* [`blip docker`](#blip-docker)
* [`blip docker-compose [FILE]`](#blip-docker-compose-file)
* [`blip docker-machine`](#blip-docker-machine)
* [`blip down`](#blip-down)
* [`blip env [MACHINE]`](#blip-env-machine)
* [`blip git`](#blip-git)
* [`blip help [COMMAND]`](#blip-help-command)
* [`blip init`](#blip-init)
* [`blip inspect [LINKNAME]`](#blip-inspect-linkname)
* [`blip ls`](#blip-ls)
* [`blip plugins`](#blip-plugins)
* [`blip plugins:install PLUGIN...`](#blip-pluginsinstall-plugin)
* [`blip plugins:link PLUGIN`](#blip-pluginslink-plugin)
* [`blip plugins:uninstall PLUGIN...`](#blip-pluginsuninstall-plugin)
* [`blip plugins:update`](#blip-pluginsupdate)
* [`blip up`](#blip-up)

## `blip destroy`

Destroys a blip environment deleteing its machines.

```
USAGE
  $ blip destroy

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\destroy.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\destroy.ts)_

## `blip docker`

Wraps docker command to trigger blip decorators.

```
USAGE
  $ blip docker

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\docker.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\docker.ts)_

## `blip docker-compose [FILE]`

describe the command here

```
USAGE
  $ blip docker-compose [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\docker-compose.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\docker-compose.ts)_

## `blip docker-machine`

Wraps docker-machine command to trigger blip decorators.

```
USAGE
  $ blip docker-machine

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\docker-machine.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\docker-machine.ts)_

## `blip down`

Bring down a blip workspace, stopping its machines.

```
USAGE
  $ blip down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\down.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\down.ts)_

## `blip env [MACHINE]`

Prints the docker-machine env for the workspace given machine.

```
USAGE
  $ blip env [MACHINE]

ARGUMENTS
  MACHINE  Name of the workspace machine. If not specified the first will be used.

OPTIONS
  -h, --help     show CLI help
  --shell=shell  [default: bash] Command output destination shell type.
```

_See code: [src\commands\env.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\env.ts)_

## `blip git`

Wraps git command to trigger blip decorators.

```
USAGE
  $ blip git

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\git.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\git.ts)_

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

## `blip init`

Initialize a blip workspace in the current directory.

```
USAGE
  $ blip init

OPTIONS
  -h, --help                   show CLI help
  --machine-name=machine-name  Docker machine name for the project
  --skip-git                   When true, does not initialize a git repository.
  --skip-setup                 When true, does not creates workspace machines.
```

_See code: [src\commands\init.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\init.ts)_

## `blip inspect [LINKNAME]`

describe the command here

```
USAGE
  $ blip inspect [LINKNAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\inspect.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\inspect.ts)_

## `blip ls`

List the available blip machines

```
USAGE
  $ blip ls

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\ls.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\ls.ts)_

## `blip plugins`

list installed plugins

```
USAGE
  $ blip plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ blip plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src\commands\plugins\index.ts)_

## `blip plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ blip plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ blip plugins:add

EXAMPLES
  $ blip plugins:install myplugin 
  $ blip plugins:install https://github.com/someuser/someplugin
  $ blip plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src\commands\plugins\install.ts)_

## `blip plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ blip plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ blip plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src\commands\plugins\link.ts)_

## `blip plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ blip plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ blip plugins:unlink
  $ blip plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src\commands\plugins\uninstall.ts)_

## `blip plugins:update`

update installed plugins

```
USAGE
  $ blip plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src\commands\plugins\update.ts)_

## `blip up`

Bring up a blip workspace, starting machines and enforcing configuration.

```
USAGE
  $ blip up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src\commands\up.ts](https://github.com/lime-it/blip/blob/v0.2.3/src\commands\up.ts)_
<!-- commandsstop -->
