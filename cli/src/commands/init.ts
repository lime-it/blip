import {Command, flags} from '@oclif/command'
import simpleGit from 'simple-git';
import { BlipConf } from '@lime.it/blip-core';

export default class Init extends Command {
  static description = 'Initialize a blip workspace in the current directory.'

  static flags = {
    help: flags.help({char: 'h'}),
    "machine-name": flags.string({description: 'Docker machine name for the project', multiple: true, required:false}),
    "skip-git": flags.boolean({description: 'When true, does not initialize a git repository.', default: false}),
    "skip-setup": flags.boolean({description: 'When true, does not creates workspace machines.'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Init)

    const git = simpleGit();

    const isGitRepo = await git.revparse(["--is-inside-work-tree"]).then(result=>result == 'true', ()=>false);

    if(!isGitRepo && !flags["skip-git"])
      await git.init();

    console.log(BlipConf.workspaceConfigFile)

    //TODO: create workspace file
    //TODO: add entry to globalregistry file
    //TODO: create machines
    //TODO: setup hosts

    // const machineList = await DockerMachine.ls()

    // const params = await inquirer.prompt([
    //   {
    //     when: response => !args.projectName,
    //     name: 'projectName',
    //     message: 'Type the project name',
    //     type: 'input',
    //     default: args.projectName,
    //   },
    //   {
    //     when: response => Boolean(flags.machinename) && !machineList.find(p => p.name == flags.machinename),
    //     name: 'machineName',
    //     message: `The machine '${flags.machinename}' does not exist. Select another ore create a new one`,
    //     type: 'list',
    //     choices: [{name: 'new'}, ...machineList.map(p => ({name: p}))],
    //     default: 'new',
    //   },
    // ])

    // params.projectName = params.projectName || args.projectName
    // params.machineName = params.machineName || 'new'

    // let createMachine = false
    // if (params.machineName == 'new') {
    //   params.machineName = 'blip--' + uuid_v4()
    //   createMachine = true
    // }

    // const mirror = !flags.mirror && !flags.localmirror ? null : flags.localmirror ? `https://${environment.registry.domainName}` : flags.mirror || null

    // const projectModel: ProjectModel = {
    //   version: '1',
    //   machines: {} as {[key: string]: ProjectMachineModel},
    // }

    // projectModel.machines[params.machineName] = {
    //   mirror: mirror ? [mirror] : null,
    //   domains: [`localhost.dev.${params.projectName}`],
    //   sharedFolders: [{name: './', hostPath: './', guestPath: '/home/docker/project'}],
    // }

    // if (existsSync(`${environmentCwd()}/${params.projectName}`))
    //   throw new Error(`Folder '${params.projectName}' already exists`)

    // mkdirSync(`${environmentCwd()}/${params.projectName}`, {recursive: true})

    // process.chdir(`${environmentCwd()}/${params.projectName}`)

    // mkdirSync(envrionmentDataPath(), {recursive: true})
    // await saveProjectModel(projectModel)

    // const tasks = new Listr([
    //   ...environmentApplyConfiguraiton(),
    // ])

    // await tasks.run()
  }
}
