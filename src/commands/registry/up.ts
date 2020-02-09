import {Command, flags} from '@oclif/command'
import Listr = require('listr')
import { machineEnsureCreated, machineEnsureActive, machineLocalDnsSetup } from '../../common/tasks'
import { environment } from '../../environment'
import execa = require('execa')
import { Docker } from '../../common/docker'
import { VirtualboxDriver } from '../../drivers/virtualbox.driver'

export default class RegistryUp extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(RegistryUp)

    const driver = new VirtualboxDriver();
    
    const tasks = new Listr([
      machineEnsureCreated(environment.registry.machineName,{driver:'virtualbox'}, driver.getMachineCreateArgs({})),
      machineEnsureActive(environment.registry.machineName),
      machineLocalDnsSetup(environment.registry.machineName, environment.registry.domainName),
      {
        title:'Starting registry container',
        task:async (ctx,task)=>{
          const d = new Docker(ctx.machineEnvironment);

          const ps = await d.ps('image');

          if(!ps.find(p=>p.image=='registry:2'))
            await execa('docker-compose',['-f', `${environment.basePath}/../assets/registry-compose.yml`,'up', '-d','--force-recreate'],{env:ctx.machineEnvironment});
        }
      }
    ]);
    
    await tasks.run();
  }
}
