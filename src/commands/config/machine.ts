import {Command, flags} from '@oclif/command'
import {readProjectModel, handleLink} from '../../common/utils'
import {projectLinkName} from '../../arguments'

export default class ConfigMachine extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    id: flags.integer({description: 'Index of the desired machine', default: 0}),
  }

  static args = [
    {...projectLinkName},
  ]

  async run() {
    const {args, flags} = this.parse(ConfigMachine)

    return handleLink(args[projectLinkName.name], async () => {
      const projectModel = await readProjectModel()

      this.log(Object.keys(projectModel.machines)[flags.id])
    })
  }
}
