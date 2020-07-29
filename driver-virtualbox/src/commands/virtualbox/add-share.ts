import {Command, flags} from '@oclif/command'
import execa = require('execa')
import { machineNameFlag, shareNameFlag, shareHostPathFlag } from '@lime.it/blip-core'
import { VBoxManage } from '../../vbox-manage'

export default class VirtualboxAddShare extends Command {
  static hidden = true

  static flags = {
    help: flags.help({char: 'h'}),
    'machine-name': machineNameFlag,
    'share-name': shareNameFlag,
    'share-host-path': shareHostPathFlag,
    'share-guest-path': shareHostPathFlag
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(VirtualboxAddShare)
    
    await VBoxManage.ensurePresent();
    
    await VBoxManage.addSharedFolder(flags['machine-name'], flags['share-name'], flags['share-host-path'], flags['share-guest-path']);
  }
}
