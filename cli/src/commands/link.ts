import {Command, flags} from '@oclif/command'
import {environmentApplyConfiguraiton, environmentBringUp} from '../common/tasks'
import Listr = require('listr')
import simpleGit = require('simple-git');
import {readGlobalBlipModel, environmentCwd, saveGlobalBlipModel} from '../common/utils'

export default class Link extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'linkName'},
  ];

  async run() {
    const {args, flags} = this.parse(Link)

    const repo = simpleGit('./')
    const remotes = await new Promise<{name: string; refs: {fetch?: string; push?: string}}[]>((res, rej) => repo.getRemotes(true, (e, p) => e ? rej(e) : res(p)))
    const origin = remotes.find(p => p.name === 'origin')?.refs?.fetch

    const config = await readGlobalBlipModel()

    if (config.links[args.linkName])
      throw new Error('Name alraedy in use.')

    config.links[args.linkName] = {
      path: environmentCwd(),
      gitRemoteFetchUrl: origin,
    }

    await saveGlobalBlipModel(config)
  }
}
