import Listr = require('listr')
import { EtcHosts } from '@lime.it/blip-core'
import { MachineListTaskContext, MachineEnvTaskContext } from './utils';

export function machineTearDownLocalDns(name: string, domain: string): Listr.ListrTask {
  if (!name || name.trim().length === 0)
    throw new Error("'name' must be set")

  return {
    title: `Cleaning hosts for '${name}' => '${domain}'`,
    task: async (ctx:MachineListTaskContext&MachineEnvTaskContext) => {

      const hosts = await EtcHosts.create()
      hosts.removeDomain(domain)
      await hosts.flush()
    },
  }
}