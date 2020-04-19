import {Command, flags} from '@oclif/command'
import { readGlobalBlipModel, saveGlobalBlipModel } from '../common/utils';

export default class Ls extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [];

  async run() {
    const {args, flags} = this.parse(Ls)
    
    const config = await readGlobalBlipModel();
    
    for(let key of Object.keys(config.links)){
      console.log(`${key}\t${config.links[key].path}\t${config.links[key].gitRemoteFetchUrl}`);
    }
  }
}
