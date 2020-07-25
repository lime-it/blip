import {Command, flags} from '@oclif/command'
import execa = require('execa')

export default class DockerMachine extends Command {
  static description = 'Wraps docker-machine command to trigger blip decorators.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static strict = false;

  async run() {
    const {argv, flags} = this.parse(DockerMachine)

    const prc = execa('docker-machine', argv);
    prc.stdout.pipe(process.stdout);
    prc.stderr.pipe(process.stderr);

    return (await prc).exitCode;
  }
}
