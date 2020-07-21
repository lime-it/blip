import { BlipConf } from "./config"
import { CLIError } from "@oclif/errors";

export async function handleWorkspaceLink(linkName: string, fn: () => Promise<any>): Promise<any> {
  const cwd = process.cwd()
  if (linkName) {
    const config = await BlipConf.readGlobalConfiguration();

    if (!config.links[linkName])
      throw new CLIError(`Unknown workspace link name: '${linkName}'`);
    else
      process.chdir(config.links[linkName].hostPath)
  }

  const result = fn();
  
  result.catch().then(p => process.chdir(cwd));

  return result;
}