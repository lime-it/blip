@lime.it/blip
=============

Project facilitator for people with little time and little desire to work

[![Version](https://img.shields.io/npm/v/@lime.it/blip.svg)](https://npmjs.org/package/@lime.it/blip)
[![CircleCI](https://circleci.com/gh/lime-it/blip/tree/master.svg?style=shield)](https://circleci.com/gh/lime-it/blip/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/@lime.it/blip.svg)](https://npmjs.org/package/@lime.it/blip)
[![License](https://img.shields.io/npm/l/@lime.it/blip.svg)](https://github.com/lime-it/blip/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ npm install -g @lime.it/blip
$ blip COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`blip destroy`](#blip-destroy)
* [`blip docker`](#blip-docker)
* [`blip docker-compose`](#blip-docker-compose)
* [`blip docker-machine`](#blip-docker-machine)
* [`blip down`](#blip-down)
* [`blip env [MACHINE]`](#blip-env-machine)
* [`blip git`](#blip-git)
* [`blip help [COMMAND]`](#blip-help-command)
* [`blip init [PROJECTNAME]`](#blip-init-projectname)
* [`blip inspect [MACHINE]`](#blip-inspect-machine)
* [`blip ls`](#blip-ls)
* [`blip plugins`](#blip-plugins)
* [`blip plugins:install PLUGIN...`](#blip-pluginsinstall-plugin)
* [`blip plugins:link PLUGIN`](#blip-pluginslink-plugin)
* [`blip plugins:uninstall PLUGIN...`](#blip-pluginsuninstall-plugin)
* [`blip plugins:update`](#blip-pluginsupdate)
* [`blip tpl [COMMAND]`](#blip-tpl-command)
* [`blip tpl:help COMMAND`](#blip-tplhelp-command)
* [`blip tpl:ls`](#blip-tplls)
* [`blip tpl:use [TEMPLATENAME]`](#blip-tpluse-templatename)
* [`blip up`](#blip-up)

## `blip destroy`

Destroys a blip environment deleteing its machines.

```
USAGE
  $ blip destroy

OPTIONS
  -h, --help  show CLI help
  -y, --yes   If set make yes the default answer to adavance prompts.
```

_See code: [src/commands/destroy.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/destroy.ts)_

## `blip docker`

Wraps docker command to trigger blip decorators.

```
USAGE
  $ blip docker

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/docker.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/docker.ts)_

## `blip docker-compose`

describe the command here

```
USAGE
  $ blip docker-compose

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/docker-compose.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/docker-compose.ts)_

## `blip docker-machine`

Wraps docker-machine command to trigger blip decorators.

```
USAGE
  $ blip docker-machine

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/docker-machine.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/docker-machine.ts)_

## `blip down`

Bring down a blip workspace, stopping its machines.

```
USAGE
  $ blip down

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/down.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/down.ts)_

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

_See code: [src/commands/env.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/env.ts)_

## `blip git`

Wraps git command to trigger blip decorators.

```
USAGE
  $ blip git

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/git.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/git.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `blip init [PROJECTNAME]`

Initialize a blip workspace in the current directory.

```
USAGE
  $ blip init [PROJECTNAME]

ARGUMENTS
  PROJECTNAME  Name of the project to be created. If missing it will be set to the name of the current directory.

OPTIONS
  -h, --help                             show CLI help
  --machine-cpu-count=machine-cpu-count  [default: 1] Docker machine cpu count
  --machine-disk-size=machine-disk-size  [default: 20480] Docker machine disk size MB
  --machine-driver=machine-driver        [default: virtualbox] Docker machine driver

  --machine-name=machine-name            [default: blipfad7ef1a8d07463ab039d0426b6918e7] Docker machine name for the
                                         project

  --machine-ram-size=machine-ram-size    [default: 2048] Docker machine ram size MB

  --skip-git                             When true, does not initialize a git repository.

  --skip-setup                           When true, does not creates workspace machines.
```

_See code: [src/commands/init.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/init.ts)_

## `blip inspect [MACHINE]`

describe the command here

```
USAGE
  $ blip inspect [MACHINE]

ARGUMENTS
  MACHINE  Name of the workspace machine. If not specified the first will be used.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/inspect.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/inspect.ts)_

## `blip ls`

List the available blip machines

```
USAGE
  $ blip ls

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/ls.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/ls.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src/commands/plugins/index.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src/commands/plugins/install.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src/commands/plugins/link.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src/commands/plugins/uninstall.ts)_

## `blip plugins:update`

update installed plugins

```
USAGE
  $ blip plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.9.0/src/commands/plugins/update.ts)_

## `blip tpl [COMMAND]`

Execute available template commands

```
USAGE
  $ blip tpl [COMMAND]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tpl/index.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/tpl/index.ts)_

## `blip tpl:help COMMAND`

Shows help of an available tempalte command

```
USAGE
  $ blip tpl:help COMMAND

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tpl/help.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/tpl/help.ts)_

## `blip tpl:ls`

List the available workspace templates

```
USAGE
  $ blip tpl:ls

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tpl/ls.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/tpl/ls.ts)_

## `blip tpl:use [TEMPLATENAME]`

Use a specified template

```
USAGE
  $ blip tpl:use [TEMPLATENAME]

ARGUMENTS
  TEMPLATENAME  Name of the template to use. If absent it will be asked.

OPTIONS
  -h, --help  show CLI help
  -y, --yes   If set make yes the default answer to adavance prompts.
  --none      If set no template will be used. If one is currently in use its teardown procedure will be invoked.
```

_See code: [src/commands/tpl/use.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/tpl/use.ts)_

## `blip up`

Bring up a blip workspace, starting machines and enforcing configuration.

```
USAGE
  $ blip up

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/up.ts](https://github.com/lime-it/blip/blob/v0.0.0-development/src/commands/up.ts)_
<!-- commandsstop -->
