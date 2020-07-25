import {Command, flags} from '@oclif/command'
import Listr = require('listr')
import { workspaceDown } from '../tasks/workspace-down.task'
import { BlipConf } from '@lime.it/blip-core'

export default class Down extends Command {
  static description = 'Bring down a blip workspace, stopping its machines.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
  ]

  async run() {
    const {args, flags} = this.parse(Down)

    const tasks = new Listr([
      ...workspaceDown(),
    ])

    await tasks.run({workspace: await BlipConf.readWorkspace()})
  }
}
