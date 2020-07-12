import {Command, flags} from '@oclif/command'
import {DockerMachine, DockerMachineListField, DockerMachineListResult} from '../../common/docker-machine'
import {environment} from '../../environment'
import Listr = require('listr')
import {machineEnsureCreated} from '../../common/tasks'
import {Openssl} from '../../common/openssl'
import {VirtualboxDriver} from '../../drivers/virtualbox.driver'

export default class RegistryInit extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(RegistryInit)
    const driver = new VirtualboxDriver()
    const tasks = new Listr([
      machineEnsureCreated(environment.registry.machineName, {driver: 'virtualbox'}, driver.getMachineCreateArgs({diskSizeMB: 40000})),
      {
        title: 'Configuring machine',
        task: async (ctx, tasks) => {
          await DockerMachine.stop(environment.registry.machineName)
          await driver.addSharedFolder(environment.registry.machineName, '/etc/blip/certs', `${environment.basePath}/certs`, '/etc/blip/certs')
          await DockerMachine.start(environment.registry.machineName)

          await Openssl.createDomainCertificate(environment.registry.domainName, true)
        },
      },
    ])

    await tasks.run()
  }
}
