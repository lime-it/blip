import {Command, flags} from '@oclif/command'
import execa = require('execa')

export default class Git extends Command {
  static description = 'Wraps git command to trigger blip decorators.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static strict = false;

  async run() {
    const {argv, flags} = this.parse(Git)

    return execa('git', argv, {stdio:'inherit'});
  }
}
