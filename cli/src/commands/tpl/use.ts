import { CLIError } from '@oclif/errors';
import { TemplateUtils } from './../../template-utils';
import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import { BlipConf } from '@lime.it/blip-core';
import execa = require('execa');

export default class TplUse extends Command {
  static description = 'Use a specified template'

  static flags = {
    help: flags.help({char: 'h'}),
    yes: flags.boolean({char:'y', required: false, default: false, description:'If set make yes the default answer to adavance prompts.' }),
    none: flags.boolean({required: false, default: false, description: 'If set no template will be used. If one is currently in use its teardown procedure will be invoked.'})
  }

  static args = [{name: 'templateName', required: false, description: "Name of the template to use. If absent it will be asked."}]

  async run() {//TODO: remove wordpress from package.json plugins, used as test
    const {args, flags} = this.parse(TplUse)

    const templates = new TemplateUtils(this.config);

    let nextTemplateName:string|null = '';
    if(flags.none){
      nextTemplateName=null;
    }
    else if(!args.templateName){
      if(Object.keys(templates.templates).length==0)
        throw new CLIError("No templates available");

      nextTemplateName = (await inquirer.prompt([{
        name: 'tempalteName',
        message: 'select a template',
        type: 'list',
        choices: Object.keys(templates.templates).map(name=>({name:name}))
      }])).tempalteName
    }
    else{
      nextTemplateName = args.templateName;
    }

    const nextTemplate = templates.templates[nextTemplateName||''];
    if(!nextTemplate && !flags.none)
      throw new CLIError(`Unavailable template '${nextTemplateName}'`);

    const workspace = await BlipConf.readWorkspace();

    if(!!workspace.template){

      if(workspace.template.name == nextTemplateName){
        this.log("Nothing to do");
        return;
      }

      const currentTeplate = templates.templates[workspace.template.name];

      const unapply = 
        flags.yes || (await cli.prompt(`Are you sure you want to unapply template '${workspace.template.name}' (Yn)?`)).toLowerCase().charAt(0) == 'y';

      if (!unapply)
        return;

      const teardownCmd = templates.getTeardownCommand(workspace.template?.name);
      if(teardownCmd){
        const teardown = 
          flags.yes || (await cli.prompt(`Do you want to perform its teardown command (Yn)?`)).toLowerCase().charAt(0) == 'y';

        if(teardown)
          await teardownCmd.load().run([]); 
      }
    }

    if(nextTemplateName == null){
      await BlipConf.overwriteWorkspace({...workspace, template: undefined});
    }
    else{

      const setupCmd = templates.getSetupCommand(nextTemplateName);

      let templateConf = null;
      if(!!setupCmd){
        templateConf = await setupCmd.load().run([]);
      }

      await BlipConf.overwriteWorkspace({...workspace, template: {name:nextTemplateName, configuration: templateConf}});
    }
  }
}
