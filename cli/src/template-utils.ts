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

  //TODO: complete
  async init(template:string):Promise<void>{
    const cmd = this.templates[template]?.commands?.find(p=>p.id == `template-${template}:init`);
    if(!cmd)
      throw new Error("Command not found");

    const result = await execa(process.argv[1], [cmd!.id, '--machine-name', 'arg']);
    return JSON.parse(result.stdout);
  }
}