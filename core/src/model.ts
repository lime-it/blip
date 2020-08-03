export interface GlobalBlipConfiguration {
  defaultDriver:string|null;
}

export interface BlipWorkspace{
  version: string;
  machines: {[key: string]: BlipWorkspaceMachine};
}

export interface BlipWorkspaceMachine{
  domains: string[];
  configuration: BlipMachineConfiguration;
  driver: string;
  attached: boolean;
}

export interface BlipMachineShareFolderInfo {
  hostPath: string;
  guestPath: string;
}

export interface BlipMachineConfiguration {
  cpuCount: number;
  ramMB: number;
  diskMB: number;
  sharedFolders: { [key:string]: BlipMachineShareFolderInfo }
}

export interface ToolingDependecy{
  isPresent():Promise<boolean>;
  ensurePresent():Promise<void>;
}