import {Command, flags} from '@oclif/command'
import {DockerMachine} from '../../common/docker-machine'
import {environment} from '../../environment'
import cli from 'cli-ux'

export default class RegistryDown extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(RegistryDown)

    cli.action.start(`Stopping ${environment.registry.machineName}...`)

    if ((await DockerMachine.ls('name', 'state')).find(p => p.name == environment.registry.machineName && p.state?.toLowerCase() == 'running'))
      await DockerMachine.stop(environment.registry.machineName)

    cli.action.stop('Done')
  }
}
