import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as uuid_v4 from 'uuid/v4'
import { DockerMachine } from '../common/docker-machine'
import Listr = require('listr')
import { environment } from '../environment'
import * as YAML from 'yaml'
import { existsSync, mkdirSync } from 'fs'
import { environmentCwd, ProjectModel, ProjectMachineModel, envrionmentDataPath, saveProjectModel } from '../common/utils'
import { environmentApplyConfiguraiton } from '../common/tasks'

export default class New extends Command {
  static description = 'describe the command here'

  static flags = {
    machinename: flags.string({description:'Docker machine name for the project'}),
    mirror: flags.string({description:"Use docker registry mirror"}),
    localmirror: flags.boolean({description:"Use local docker registry mirror"}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'projectName'}]

  async run() {
    const {args, flags} = this.parse(New)

    const machineList = await DockerMachine.ls();

    const params = await inquirer.prompt([
      {
        when:(response)=>!args.projectName,
        name:'projectName',
        message:'Type the project name',
        type:'input',
        default: args.projectName
      },
      {
        when:(response)=>!!flags.machinename && !machineList.find(p=>p.name==flags.machinename),
        name:'machineName',
        message:`The machine '${flags.machinename}' does not exist. Select another ore create a new one`,
        type:'list',
        choices:[{name:'new'},...machineList.map(p=>({name:p}))],
        default:'new'
      }
    ]);    

    params.projectName=params.projectName||args.projectName;
    params.machineName=params.machineName||'new';

    let createMachine=false;
    if(params.machineName=='new'){
      params.machineName="blip--"+uuid_v4();
      createMachine=true;
    }
    
    const mirror = !flags.mirror && !flags.localmirror?null:flags.localmirror?`https://${environment.registry.domainName}`:flags.mirror||null;


    const projectModel:ProjectModel={
      version:'1',
      machines:{} as {[key:string]:ProjectMachineModel}
    };

    projectModel.machines[params.machineName]={
      mirror:mirror?[mirror]:null,
      domains:[`localhost.dev.${params.projectName}`],
      sharedFolders:[{name:'./',hostPath:'./',guestPath:'/home/docker/project'}]
    };

    if(existsSync(`${environmentCwd()}/${params.projectName}`))
      throw new Error(`Folder '${params.projectName}' already exists`);

    mkdirSync(`${environmentCwd()}/${params.projectName}`,{recursive:true});

    process.chdir(`${environmentCwd()}/${params.projectName}`);

    mkdirSync(envrionmentDataPath(),{recursive:true});
    await saveProjectModel(projectModel);

    const tasks = new Listr([
      ...environmentApplyConfiguraiton()
    ]);

    await tasks.run();
  }
}
