import execa = require('execa');
import { CLIError } from '@oclif/errors';
import { ToolingDependecy } from '@lime.it/blip-core';

export interface VBoxManageTool extends ToolingDependecy{
  
}

class VBoxManageToolImpl implements VBoxManageTool {
  async isPresent(): Promise<boolean> {
    const {exitCode} = await execa('vboxmanage', ['-v']);
    return exitCode == 0;
  }
  async ensurePresent(): Promise<void> {
    if(await this.isPresent() == false)
      throw new CLIError(`VBoxManage is missing from the current environment. Please check https://www.virtualbox.org/wiki/Downloads`);
  }
}

export const VBoxManage:VBoxManageTool = new VBoxManageToolImpl();