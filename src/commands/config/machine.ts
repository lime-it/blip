import {Command, flags} from '@oclif/command'
import { readProjectModel } from '../../common/utils'

export default class ConfigMachine extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    id:flags.integer({description: 'index of the desired machine'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(ConfigMachine)

    const projectModel = await readProjectModel();

    this.log(Object.keys(projectModel.machines)[flags.id!==undefined?flags.id:0]);
  }
}
