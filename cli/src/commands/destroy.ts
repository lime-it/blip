import {Command, flags} from '@oclif/command'
import {readProjectModel} from '../common/utils'
import {DockerMachine} from '../common/docker-machine'
import Listr = require('listr')
import {EtcHosts} from '../common/etc-hosts'
import cli from 'cli-ux'

export default class Destroy extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Destroy)

    const projectModel = await readProjectModel()
    const machines = await DockerMachine.ls('name', 'state')

    const yesNo: string = await cli.prompt('Are you sure you want to destroy the project environment (Yn)?')
    this.log()

    if (yesNo.toLowerCase().charAt(0) == 'y') {
      const tasks: Listr.ListrTask[] = []
      const domains: string[] = []
      for (const name of Object.keys(projectModel.machines)) {
        projectModel.machines[name].domains.forEach(d => domains.push(d))

        if (machines.find(p => p.name == name))
          tasks.push({
            title: `Removing machine '${name}'`,
            task: async (ctx, task) => {
              await DockerMachine.remove(name)
            },
          })
      }

      if (domains.length > 0)
        tasks.push({
          title: 'Cleaning hosts',
          task: async (ctx, task) => {
            const hosts = await EtcHosts.create()
            domains.forEach(d => hosts.removeDomain(d))
            await hosts.flush()
          },
        })

      if (tasks.length > 0)
        await (new Listr(tasks)).run()
    }
  }
}
