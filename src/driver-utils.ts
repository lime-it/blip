import { IConfig, Command } from '@oclif/config';
import execa = require('execa');
import { BlipMachineConfiguration } from '@lime.it/blip-core';

export class DriverUtils{

  private _drivers:{[key:string]:{commands:Command.Plugin[]}}={};
  public get drivers() {
    return this._drivers;
  }

  constructor(private config:IConfig) {
    if(!this.config)
      throw new Error("'config' cannot be null");

    this._drivers = this.config.plugins
      .filter(p=>p.pjson.keywords.indexOf('blip-driver')>=0)
      .map(p=>{
        const name = p.pjson.keywords.find((k:string)=>k.startsWith('blip-driver-') && k!='blip-driver-').replace("blip-driver-","");
        return {
          name,
          commands:p.commands.filter(c=>c.id.startsWith(`driver-${name}`))
        }
      })
      .reduce((acc, p)=>{
        acc[p.name]={commands:p.commands}; 
        return acc;
      }, {} as {[key:string]:{commands:Command.Plugin[]}});
  }

  async getConfig(driver:string, machineName:string):Promise<BlipMachineConfiguration>{
    const cmd = this.drivers[driver]?.commands?.find(p=>p.id == `driver-${driver}:get-config`);
    if(!cmd)
      throw new Error("Command not found");

    return await cmd.load().run(['--machine-name', machineName]);
  }

  async setConfig(driver:string, machineName:string, configuration: Partial<BlipMachineConfiguration>):Promise<void>{
    const cmd = this.drivers[driver]?.commands?.find(p=>p.id == `driver-${driver}:set-config`);
    if(!cmd)
      throw new Error("Command not found");

    const args = ['--machine-name', machineName];
    if(configuration.cpuCount){
      args.push("--cpu-count");
      args.push(configuration.cpuCount.toString())
    }
    if(configuration.ramMB){
      args.push("--ram-size");
      args.push(configuration.ramMB.toString())
    }
    if(configuration.diskMB){
      args.push("--disk-size");
      args.push(configuration.diskMB.toString())
    }

    try{
      return await cmd.load().run(args);
    }
    catch(err){
      throw new Error("Error setting machine configuration.");
    }
  }  

  async parseCreateArgs(driver:string, machineName:string, configuration: Partial<BlipMachineConfiguration>):Promise<{[key:string]:string}>{
    const cmd = this.drivers[driver]?.commands?.find(p=>p.id == `driver-${driver}:parse-create-args`);
    if(!cmd)
      throw new Error("Command not found");

    const args = ['--machine-name', machineName];
    if(configuration.cpuCount){
      args.push("--cpu-count");
      args.push(configuration.cpuCount.toString())
    }
    if(configuration.ramMB){
      args.push("--ram-size");
      args.push(configuration.ramMB.toString())
    }
    if(configuration.diskMB){
      args.push("--disk-size");
      args.push(configuration.diskMB.toString())
    }
  
    const jresult = await cmd.load().run(args);
    Object.keys(jresult).forEach(name=>jresult[name]=jresult[name]?.toString())

    return jresult;
  }  

  async addShare(driver:string, machineName:string, guestPath: string, hostPath: string):Promise<void>{
    const cmd = this.drivers[driver]?.commands?.find(p=>p.id == `driver-${driver}:add-share`);
    if(!cmd)
      throw new Error("Command not found");

    try{
      const result = await cmd.load().run(['--machine-name', machineName,
        '--share-host-path', hostPath,
        '--share-guest-path', guestPath
      ]);
    }
    catch(err){
      throw new Error("Error setting machine configuration.");
    }
  }  

  async removeShare(driver:string, machineName:string, guestPath: string):Promise<void>{
    const cmd = this.drivers[driver]?.commands?.find(p=>p.id == `driver-${driver}:remove-share`);
    if(!cmd)
      throw new Error("Command not found");

    try{
      const result = await cmd.load().run(['--machine-name', machineName,
        '--share-guest-path', guestPath
      ]);
    }
    catch(err){
      throw new Error("Error setting machine configuration.");
    }
  }
}