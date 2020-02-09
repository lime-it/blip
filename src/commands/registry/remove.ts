import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import { DockerMachine } from '../../common/docker-machine'
import { environment } from '../../environment'

export default class RegistryRemove extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(RegistryRemove)
    
    const yesNo:string = await cli.prompt(`Are you sure you want to remove machine '${environment.registry.machineName}' (Yn)?`);

    if(yesNo.toLowerCase().charAt(0)=='y')
      await DockerMachine.remove(environment.registry.machineName);
  }
}
