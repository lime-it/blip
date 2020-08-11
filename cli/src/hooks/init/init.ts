import {Hook} from '@oclif/config'
import { BlipConf } from '@lime.it/blip-core'

const hook: Hook<'init'> = async function (opts) {
  const conf = await BlipConf.readGlobalConfiguration();

  if(!conf.defaultDriver){
    await BlipConf.overwriteGlobalConfiguration({
      defaultDriver:'virtualbox'
    });
  }
}

export default hook
