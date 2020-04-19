import {Command, flags} from '@oclif/command'
import { environmentApplyConfiguraiton, environmentBringUp } from '../common/tasks'
import Listr = require('listr')
import { readGlobalBlipModel, handleLink } from '../common/utils'

export default class Up extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [
    {name:"linkName", require: false}
  ]

  async run() {
    const {args, flags} = this.parse(Up)

    return handleLink(args.linkName, async ()=>{
      const tasks = new Listr([
        ...environmentApplyConfiguraiton(),
        ...environmentBringUp()
      ]);
  
      await tasks.run();
    })
  }
}
