import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import { BlipConf, DockerMachine } from '@lime.it/blip-core';

export default class Ls extends Command {
  static description = 'List the available blip machines'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [];

  async run() {
    const {args, flags} = this.parse(Ls)

    const config = await BlipConf.readWorkspace()
    const machines = await DockerMachine.ls('name', 'active');

    cli.table(Object.keys(config.machines).map(key=>({
      id:key,
      ...config.machines[key], 
      created: !!machines.find(p=>p.name==key), 
      active: !!machines.find(p=>p.name==key && p.state?.toLowerCase() === 'running')
    })),
    {
      id: { header: "Id", minWidth: 10 },
      driver:{ header: 'Driver', minWidth: 20 },
      attached: { header: "Attached", minWidth: 4  },
      created: { header: "Created", minWidth: 4 },
      active: { header: "Active", minWidth: 4 }
    });
  }
}
