import { DockerMachineListResult, DockerMachine, DockerMachineEnv, BlipWorkspace, BlipConf } from '@lime.it/blip-core';
import { IConfig } from '@oclif/config';

export interface OclifCommandTaskContext {
  config:IConfig
}

export interface MachineListTaskContext {
  machineList:DockerMachineListResult[]
}

export interface MachineEnvTaskContext {
  machineEnvironment:DockerMachineEnv
}

export interface WorkspaceTaskContext {
  workspace:BlipWorkspace
}

export async function fillMachineListTaskContext(ctx:any, force:boolean = false){
  if (!ctx.machineList || force)
    ctx.machineList = await DockerMachine.ls()
  return ctx as MachineListTaskContext;
}

export async function fillMachineEnvTaskContext(ctx:any, name:string){  
  ctx.machineEnvironment = await DockerMachine.env(name, "bash");
  return ctx as MachineEnvTaskContext;
}

export async function fillWorkspaceTaskContext(ctx:any){
  ctx.workspace = await BlipConf.readWorkspace();
  return ctx as WorkspaceTaskContext;
}

export function isMachinePresent(ctx:MachineListTaskContext, name:string):boolean{
  return !!ctx.machineList.find(p => p.name === name);
}

export function isMachineRunning(ctx:MachineListTaskContext, name:string):boolean{  
  const machine = ctx.machineList.find(p => p.name === name);
  return machine?.state?.toLowerCase() === 'running'
}

export function ensureMachineIsPresent(ctx:MachineListTaskContext, name:string){
  const machine = ctx.machineList.find(p => p.name === name);
  if(!machine)
    throw new Error('Machine not found');
}

export async function waitIfMachineIsStarting(ctx:MachineListTaskContext, name:string, timeout:number = 10000):Promise<void>{
  const machine = ctx.machineList.find(p => p.name === name);
  if(!machine)
    throw new Error('Machine not found');

  if(machine.state !== 'Starting')
    return;

  const timeStep = 2000;
  let waitTime = 0;
  do{
    await new Promise((resolve,_)=>setTimeout(()=>resolve(), timeStep));
    waitTime += timeStep;
    ctx.machineList = await DockerMachine.ls();
  }
  while (machine.state === 'Starting' && waitTime < timeout)
}

export async function ensureMachineIsPresentAndRunning(ctx:MachineListTaskContext, name:string){
  const machine = ctx.machineList.find(p => p.name === name);
  if(!machine)
    throw new Error('Machine not found');

  await waitIfMachineIsStarting(ctx, name, 10000);

  if (machine.state !== 'Running')
    throw new Error('Machine not running')
}