import { CLIError } from '@oclif/errors';
import {Command, flags} from '@oclif/command'
import { BlipConf } from '@lime.it/blip-core'
import { TemplateUtils } from '../../template-utils'
import execa = require('execa');

export default class TplHelp extends Command {
  static description = 'Shows help of an available tempalte command'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'command', required: true}]

  async run() {
    const {args, flags} = this.parse(TplHelp)
    
    const workspace = await BlipConf.readWorkspace();
    const templates = new TemplateUtils(this.config);

    if(!workspace.template){
      this.log("No template currently in use. See 'tpl:ls' to get a list and 'tpl:use' to use one.")
      return;
    }

    const commands = templates.getCommands(workspace.template.name);
    const cmd = commands.find(c => c.id.endsWith(`:${args.command||''}`))

    if(!cmd){
      throw new CLIError(`Unknown command '${args.command}'`);
    }
    else{
      await cmd.load().run(['--help']);
    }
  }
}
