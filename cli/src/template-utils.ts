import { IConfig, Command } from '@oclif/config';
import execa = require('execa');
import { BlipMachineConfiguration } from '@lime.it/blip-core';

export class TemplateUtils{

  private _templates:{[key:string]:{description:string, commands:Command.Plugin[]}}={};
  public get templates() {
    return this._templates;
  }

  constructor(private config:IConfig) {
    if(!this.config)
      throw new Error("'config' cannot be null");

    this._templates = this.config.plugins
      .filter(p=>p.pjson.keywords.indexOf('blip-template')>=0)
      .map(p=>{
        const name = p.pjson.keywords.find((k:string)=>k.startsWith('blip-template-') && k!='blip-template-').replace("blip-template-","");
        return {
          name,
          description: p.pjson.description,
          commands:p.commands.filter(c=>c.id.startsWith(`template-${name}`))
        }
      })
      .reduce((acc, p)=>{
        acc[p.name]={description: p.description, commands:p.commands}; 
        return acc;
      }, {} as {[key:string]:{description:string, commands:Command.Plugin[]}});
  }
  
  getSetupCommand(template:string):Command.Plugin|null{
    return this.templates[template]?.commands?.find(c=>c.id==`template-${template}:__setup`) || null;
  }
  
  getTeardownCommand(template:string):Command.Plugin|null{
    return this.templates[template]?.commands?.find(c=>c.id==`template-${template}:__teardown`) || null;
  }
  
  getPrerunCommandHook(template:string, commandId:string):Command.Plugin|null{
    return this.templates[template]?.commands?.find(c=>c.id==`template-${template}:__hook_prerun_${commandId}`) || null;
  }
  
  getPostrunCommandHook(template:string, commandId:string):Command.Plugin|null{
    return this.templates[template]?.commands?.find(c=>c.id==`template-${template}:__hook_postrun_${commandId}`) || null;
  }

  getCommands(template:string){
    return this.templates[template]?.commands?.filter(c=>c.id.startsWith(`template-${template}:`) && !c.id.startsWith(`template-${template}:__`)) || null;
  }
}