import {Command, flags} from '@oclif/command'
import Listr = require('listr')
import { workspaceEnforceConfig } from '../tasks/workspace-enforce-config.task'
import { workspaceUp } from '../tasks/workspace-up.task'
import { BlipConf } from '@lime.it/blip-core'

export default class Up extends Command {
  static description = 'Bring up a blip workspace, starting machines and enforcing configuration.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
  ]

  async run() {
    const {args} = this.parse(Up)

    const tasks = new Listr([
      ...workspaceEnforceConfig(),
      ...workspaceUp(),
    ])

    await tasks.run({workspace: await BlipConf.readWorkspace()})
  }
}
