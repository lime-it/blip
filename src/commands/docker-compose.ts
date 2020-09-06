import {Command, flags} from '@oclif/command'
import execa = require('execa')

export default class DockerCompose extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static strict = false;

  async run() {
    const {argv, flags} = this.parse(DockerCompose)

    return execa('docker-compose', argv, {stdio:'inherit'});
  }
}
