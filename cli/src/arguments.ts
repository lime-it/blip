import {args} from '@oclif/parser'

export const projectLinkName: args.IArg<string> = {
  name: 'linkName',
  description: 'Globally linked project name on which to execute the command.',
  required: false,
}
