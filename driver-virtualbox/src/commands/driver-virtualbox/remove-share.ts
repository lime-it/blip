import {Command, flags} from '@oclif/command'
import { machineNameFlag, shareNameFlag } from '@lime.it/blip-core'
import execa = require('execa')
import { VBoxManage } from '../../vbox-manage'

export default class VirtualboxRemoveShare extends Command {
  static hidden = true

  static flags = {
    help: flags.help({char: 'h'}),
    'machine-name': machineNameFlag,
    'share-name': shareNameFlag
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(VirtualboxRemoveShare)
    
    await VBoxManage.removeSharedFolder(flags['machine-name'], flags['share-name']);
  }
}
