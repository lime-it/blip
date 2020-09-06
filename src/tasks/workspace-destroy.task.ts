import Listr = require('listr')
import { WorkspaceTaskContext, fillWorkspaceTaskContext } from './utils'
import { machineDestroy } from './machine-destroy.task';
import { machineTearDownLocalDns } from './machine-teardown-local-dns.task';

export function workspaceDestroy(): Listr.ListrTask[] {
  return [
    {
      title: "Destroying workspace",
      task: async (ctx:WorkspaceTaskContext)=>{
        await fillWorkspaceTaskContext(ctx);
        
        return new Listr(Object.keys(ctx.workspace.machines).filter(name=>!ctx.workspace.machines[name].attached).map(name=>[
          machineDestroy(name),
          {
            title: `Cleaning local dns for ${name}`,
            task: ()=> new Listr(ctx.workspace.machines[name].domains.map(domain=>machineTearDownLocalDns(name, domain)))
          }
        ])
        .reduce((acc, p)=>[...acc, ...p], []))
      }
    }
  ];
}
