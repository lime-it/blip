import {Command, flags} from '@oclif/command'
import { BlipConf, DockerMachine } from '@lime.it/blip-core'
import { CLIError } from '@oclif/errors';
import { machineNameArg } from '../arguments';

export default class Env extends Command {
  static description = 'Prints the docker-machine env for the workspace given machine.'

  static flags = {
    help: flags.help({char: 'h'}),
    shell: flags.string({default: 'bash', description: 'Command output destination shell type.'}),
  }

  static args = [
    machineNameArg
  ]

  async run() {
    const {args, flags} = this.parse(Env)

    const workspace = await BlipConf.readWorkspace();

    if(Object.keys(workspace.machines).length == 0)
      throw new CLIError("The workspace do not have any machine");

    if(!args.machine)
      args.machine = Object.keys(workspace.machines)[0];

    if(!workspace.machines[args.machine])
      throw new CLIError(`Unknown machine '${args.machine}'`);

    process.stdout.write(await DockerMachine.envStdout(args.machine, flags.shell));
  }
}
