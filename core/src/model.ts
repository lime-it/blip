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

export interface GlobalBlipConfiguration {
  links: {[key: string]: BlipWorkspaceLink};
}

export interface BlipWorkspaceLink{
  gitRemoteFetchUrl?: string;
  hostPath: string;
}

export interface BlipWorkspace{
  version: string;
  machines: {[key: string]: BlipWorkspaceMachine};
}

export interface BlipWorkspaceMachine{
  mirror: null|string[];
  domains: string[];
  sharedFolders: BlipMachineSharedFolder[];
}

export interface ToolingDependecy{
  isPresent():Promise<boolean>;
  ensurePresent():Promise<void>;
}