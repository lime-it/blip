import {Command, flags} from '@oclif/command'
import { readGlobalBlipModel, environmentCwd, saveGlobalBlipModel } from '../common/utils';

export default class Unlink extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [
    {name:'linkName'}
  ];

  async run() {
    const {args, flags} = this.parse(Unlink)
    
    const config = await readGlobalBlipModel();

    if(config.links[args.linkName])
      delete config.links[args.linkName];

    await saveGlobalBlipModel(config);
  }
}
