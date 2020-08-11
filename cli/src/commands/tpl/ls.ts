import {Command, flags} from '@oclif/command'
import { TemplateUtils } from '../../template-utils'
import {cli} from 'cli-ux'

export default class TplLs extends Command {
  static description = 'List the available workspace templates'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(TplLs)
    
    const templates = new TemplateUtils(this.config);

    cli.table(Object.keys(templates.templates).map(key=>({
      name: key,
      description: templates.templates[key].description,
    })),
    {
      name: { header: "Name", minWidth: 20 },
      description:{ header: 'Description', minWidth: 20 },
    });
  }
}
