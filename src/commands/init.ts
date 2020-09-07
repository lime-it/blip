import {Command, flags} from '@oclif/command'
import { CLIError } from '@oclif/errors';
import simpleGit from 'simple-git';
import { BlipConf } from '@lime.it/blip-core';
import { DriverUtils } from '../driver-utils';
import { v4 as uuid} from 'uuid';
import Listr = require('listr');
import { workspaceEnforceConfig } from '../tasks/workspace-enforce-config.task';
import { workspaceUp } from '../tasks/workspace-up.task';
import { sep, resolve } from 'path';

export default class Init extends Command {
  static description = 'Initialize a blip workspace in the current directory.'

  static flags = {
    help: flags.help({char: 'h'}),
    "machine-name": flags.string({description: 'Docker machine name for the project', required:false, default: ''}),
    "machine-driver": flags.string({description: 'Docker machine driver', dependsOn: ['machine-name'], default: 'virtualbox' }),
    "machine-cpu-count": flags.integer({description: 'Docker machine cpu count', dependsOn: ['machine-name'], default: 1 }),
    "machine-ram-size": flags.integer({description: 'Docker machine ram size MB', dependsOn: ['machine-name'], default: 2048 }),
    "machine-disk-size": flags.integer({description: 'Docker machine disk size MB', dependsOn: ['machine-name'], default: 20*1024 }),
    "skip-git": flags.boolean({description: 'When true, does not initialize a git repository.', default: false}),
    "skip-setup": flags.boolean({description: 'When true, does not creates workspace machines.'})
  }

  static args = [
    {name:'projectName', required: false, description: 'Name of the project to be created. If missing it will be set to the name of the current directory.'}
  ]

  async run() {
    const {args, flags} = this.parse(Init)    
    
    if(flags['machine-name']=='')
      flags['machine-name'] = `blip${uuid().replace(/-/g, '')}`;
      
    if(!args.projectName)
      args.projectName = process.cwd().split(sep).reverse()[0];

    if(!/^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(args.projectName))
      throw new CLIError(`'projectName' must respect the following pattern ^[a-zA-Z0-9].*[a-zA-Z0-9]$`);

    if (BlipConf.isWorkspace)
      throw new CLIError(`Already in a workspace`);

    const drivers = new DriverUtils(this.config);

    const git = simpleGit();

    const isGitRepo = await git.revparse(["--is-inside-work-tree"]).then(result=>result == 'true', ()=>false);

    if(!isGitRepo && !flags["skip-git"])
      await git.init();

    if(!Object.keys(drivers.drivers).includes(flags["machine-driver"]))
      throw new CLIError(`Driver '${flags["machine-driver"]}' unavailable`);

    await BlipConf.createWorkspace();

    if(!flags["skip-setup"]){

      let workspaceConfig = await BlipConf.readWorkspace();
      
      workspaceConfig.machines[flags['machine-name']] = {
        attached: false,
        driver: flags['machine-driver'],
        domains: [`${args.projectName}.local`],
        configuration:{
          cpuCount: flags['machine-cpu-count'],
          ramMB: flags['machine-ram-size'],
          diskMB: flags['machine-disk-size'],
          sharedFolders:{
            '/home/docker/project': { hostPath: resolve(BlipConf.getWorkspaceRootPath()) }
          }
        }
      }

      workspaceConfig.defaultMachine = flags['machine-name'];

      await BlipConf.overwriteWorkspace(workspaceConfig);

      const tasks = new Listr([
        ...workspaceEnforceConfig(),
        ...workspaceUp(),
      ])

      await tasks.run({workspace: await BlipConf.readWorkspace(), config: this.config})
    }
  }
}
