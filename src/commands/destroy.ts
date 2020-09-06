import {Command, flags} from '@oclif/command'
import Listr = require('listr')
import cli from 'cli-ux'
import { BlipConf } from '@lime.it/blip-core'
import { workspaceDestroy } from '../tasks/workspace-destroy.task'

export default class Destroy extends Command {
  static description = 'Destroys a blip environment deleteing its machines.'

  static flags = {
    help: flags.help({char: 'h'}),
    yes: flags.boolean({char:'y', required: false, default: false, description:'If set make yes the default answer to adavance prompts.' }),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Destroy)

    const workspace = await BlipConf.readWorkspace();

    const destroy = flags.yes || (await cli.prompt('Are you sure you want to destroy the project environment (Yn)?')).toLowerCase().charAt(0) == 'y';

    if (destroy) {      
      const tasks = new Listr([
        ...workspaceDestroy()
      ])

      await tasks.run({workspace: await BlipConf.readWorkspace(), config: this.config})
    }
  }
}
