// import {Command, flags} from '@oclif/command'
// import {readGlobalBlipModel, saveGlobalBlipModel, readProjectModel, handleLink} from '../common/utils'
// import {DockerMachine} from '../common/docker-machine'

// export default class Env extends Command {
//   static description = 'describe the command here'

//   static flags = {
//     help: flags.help({char: 'h'}),
//     shell: flags.string({default: 'bash'}),
//   }

//   static args = [
//     {name: 'linkName', require: false},
//   ]

//   async run() {
//     const {args, flags} = this.parse(Env)

//     return handleLink(args.linkName, async () => {
//       const projectModel = await readProjectModel()

//       console.log(await DockerMachine.envStdout(Object.keys(projectModel.machines)[0], flags.shell))
//     })
//   }
// }
