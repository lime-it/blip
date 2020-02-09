import {Command, flags} from '@oclif/command'
import { environmentApplyConfiguraiton, environmentBringUp } from '../common/tasks'
import Listr = require('listr')

export default class Up extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Up)

    const tasks = new Listr([
      ...environmentApplyConfiguraiton(),
      ...environmentBringUp()
    ]);

    await tasks.run();
  }
}
