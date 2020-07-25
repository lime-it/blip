import {args} from '@oclif/parser'

export const machineNameArg: args.IArg<string> = {
  name: 'machine',
  required: false,
  description:'Name of the workspace machine. If not specified the first will be used.'
}