import { CLIError } from '@oclif/errors';
import {Command, flags} from '@oclif/command'
import { BlipConf } from '@lime.it/blip-core'
import { TemplateUtils } from '../../template-utils'
import execa = require('execa')
import {cli} from 'cli-ux'

export default class TplIndex extends Command {
  static description = 'Execute available template commands'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static strict = false;

  static args = [{name: 'command', required: false}]

  async run() {
    const {argv, args, flags} = this.parse(TplIndex)
    
    const workspace = await BlipConf.readWorkspace();
    const templates = new TemplateUtils(this.config);

    if(!workspace.template){
      this.log("No template currently in use. See 'tpl:ls' to get a list and 'tpl:use' to use one.")
      return;
    }

    const commands = templates.getCommands(workspace.template.name);
    const cmd = commands.find(c => c.id.endsWith(`:${args.command||''}`))

    if(!args.command){
      cli.table(commands.map(c=>({
        id:c.id.replace(/^template\-.+:/, ''),
        description: c.description
      })),
      {
        id: { header: "Command", minWidth: 20 },
        description:{ header: "Description", minWidth: 40 }
      });
    }
    else if(!cmd){
      throw new CLIError(`Unknown command '${args.command}'`);
    }
    else{
      await cmd.load().run(argv.slice(1));
    }
  }
}
