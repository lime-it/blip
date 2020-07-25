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

    const prc = execa('docker-compose', argv);
    prc.stdout.pipe(process.stdout);
    prc.stderr.pipe(process.stderr);

    return (await prc).exitCode;
  }
}
