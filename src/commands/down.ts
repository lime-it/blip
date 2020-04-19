import {Command, flags} from '@oclif/command'
import { readProjectModel, handleLink } from '../common/utils'
import { DockerMachine } from '../common/docker-machine'
import Listr = require('listr')

export default class Down extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [
    {name:"linkName", require: false}
  ]

  async run() {
    const {args, flags} = this.parse(Down)

    return handleLink(args.linkName, async ()=>{
      const projectModel = await readProjectModel();
      const machines = await DockerMachine.ls('name','state');
  
      const tasks:Listr.ListrTask[]=[];
      for(let name of Object.keys(projectModel.machines)){
        if(machines.find(p=>p.name==name && p.state?.toLowerCase()=='running'))
          tasks.push({
            title:`Stopping machine '${name}'`,
            task:async (ctx,task)=>{
              await DockerMachine.stop(name);
            }
          });
      }
  
      if(tasks.length>0)
        await (new Listr(tasks)).run();
    })
  }
}
