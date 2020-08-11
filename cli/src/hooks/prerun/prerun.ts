import {Hook} from '@oclif/config'
import { BlipConf } from '@lime.it/blip-core'
import { TemplateUtils } from '../../template-utils';
import execa = require('execa');

const hook: Hook<'prerun'> = async function (command) {
  if(BlipConf.isWorkspace && ['up','down'].includes(command.Command.id)){
    const workspace = await BlipConf.readWorkspace();

    const templates = new TemplateUtils(command.config);

    const tplName = workspace.template?.name||'';
    const tplCommand = templates.templates[tplName].commands.find(p=>p.id==`template-${name}:hook_pre_${command.Command.id}`);

    if(!!tplCommand){
      await execa(process.argv[1], [tplCommand!.id])
    }
  }
}

export default hook
