import {Command, flags} from '@oclif/command'
import { readGlobalBlipModel, saveGlobalBlipModel, readProjectModel } from '../common/utils';
import { DockerMachine } from '../common/docker-machine';

export default class Env extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    shell: flags.string({default:'bash'})
  }

  static args = [];

  async run() {
    const {args, flags} = this.parse(Env)
    
    const projectModel = await readProjectModel();

    console.log(DockerMachine.envStdout(Object.keys(projectModel.machines)[0], flags.shell));
  }
}
