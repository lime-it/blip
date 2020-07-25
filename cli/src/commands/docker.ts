import {Command, flags} from '@oclif/command'
import execa = require('execa')

export default class Docker extends Command {
  static description = 'Wraps docker command to trigger blip decorators.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static strict = false;

  async run() {
    const {argv, flags} = this.parse(Docker)

    const prc = execa('docker', argv);
    prc.stdout.pipe(process.stdout);
    prc.stderr.pipe(process.stderr);

    return (await prc).exitCode;
  }
}
