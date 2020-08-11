import {Command} from '@oclif/config'
import execa = require('execa');

export type ExecuteCommandOutputType = 'text'|'json'|'none';

export function executeCommand(command: Command.Plugin, output:'text', args?:any[]):Promise<string>
export function executeCommand<T>(command: Command.Plugin, output:'json', args?:any[]):Promise<T>
export function executeCommand(command: Command.Plugin, output:'none', args?:any[]):Promise<void>
export async function executeCommand<T>(command: Command.Plugin, output:ExecuteCommandOutputType, args:any[]=[]):Promise<T|void>{

  args = args || [];

  const result = await execa(process.argv[1],[command!.id, ...args], { stdio: ['inherit', 'pipe', 'inherit'] });

  if(output!='none')
    return output == 'text' ? result.stdout : JSON.parse(result.stdout);
}