import {Command, flags} from '@oclif/command'
import Listr = require('listr')
import {handleWorkspaceLink} from '@lime.it/blip-core'

export default class Inspect extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'linkName', require: false},
  ]

  async run() {
    const {args} = this.parse(Inspect)

    //console.log(this.config.plugins[1].pjson.keywords);
    console.log(this.config.plugins.map(p=>p.pjson.name));

    // return handleWorkspaceLink(args.linkName, async () => {
    //   // const tasks = new Listr([
    //   //   ...environmentApplyConfiguraiton(),
    //   //   ...environmentBringUp(),
    //   // ])

    //   // await tasks.run()
    // })
  }
}
