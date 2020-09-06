import {Hook} from '@oclif/config'
import { BlipConf } from '@lime.it/blip-core'
import { TemplateUtils } from '../../template-utils';
import execa = require('execa');

const hook: Hook<'postrun'> = async function (command) {
  if(BlipConf.isWorkspace && ['up','down'].includes(command.Command.id)){
    const workspace = await BlipConf.readWorkspace();

    const templates = new TemplateUtils(command.config);

    const tplName = workspace.template?.name||'';
    const tplCommand = templates.getPostrunCommandHook(tplName, command.Command.id);

    if(!!tplCommand){
      await tplCommand.load().run([]);
    }
  }
}

export default hook
