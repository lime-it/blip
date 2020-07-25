import {Command, flags} from '@oclif/command'
import { CLIError } from '@oclif/errors';
import { machineNameArg } from '../arguments'
import { BlipConf } from '@lime.it/blip-core'
import {cli} from 'cli-ux'

export default class Inspect extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    machineNameArg
  ]

  async run() {
    const {args} = this.parse(Inspect)

    const workspace = await BlipConf.readWorkspace();

    if(Object.keys(workspace.machines).length == 0)
      throw new CLIError("The workspace do not have any machine");

    if(!args.machine)
      args.machine = Object.keys(workspace.machines)[0];

    const machine = workspace.machines[args.machine];
    if(!machine)
      throw new CLIError(`Unknown machine '${args.machine}'`);
      
    process.stdout.write(JSON.stringify(machine, null, 4));
    
    //console.log(this.config.plugins[1].pjson.keywords);
    // console.log(this.config.plugins.map(p=>p.pjson.name));
  }
}
