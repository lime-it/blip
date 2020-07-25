export interface GlobalBlipConfiguration {
  defaultDriver:string|null;
}

export interface BlipWorkspace{
  version: string;
  machines: {[key: string]: BlipWorkspaceMachine};
}

export interface BlipWorkspaceMachine{
  domains: string[];
  sharedFolders: BlipMachineSharedFolder[];
  driver:string;
  attached:boolean;
}

export interface BlipMachineConfig{
  cpuCount: number;
  diskSizeMB: number;
  ramSizeMB: number;
}

export interface BlipMachineSharedFolder{
  name: string;
  hostPath: string;
  guestPath: string;
}

export interface ToolingDependecy{
  isPresent():Promise<boolean>;
  ensurePresent():Promise<void>;
}