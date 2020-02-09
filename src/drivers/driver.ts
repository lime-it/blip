export interface MachineConfig{
    cpuCount:number;
    diskSizeMB:number;
    ramSizeMB:number;
}

export interface MachineSharedFolder{
    name:string;
    hostPath:string;
    guestPath:string;
}

export abstract class VmDriver {
    constructor() {
        
    }

    public abstract getMachineCreateArgs(config:Partial<MachineConfig>):{[key:string]:string};

    public abstract addSharedFolder(vmName:string, name:string, hostPath:string, guestPath:string):Promise<void>;
    public abstract updateSharedFolder(vmName:string, name:string, hostPath:string, guestPath:string):Promise<void>;
    public abstract removeSharedFolder(vmName:string, name:string):Promise<void>;
    public abstract getSharedFolders(vmName:string):Promise<MachineSharedFolder[]>;
    
    public abstract getMachineConfig(vmName:string):Promise<MachineConfig>;
    public abstract updateMachineConfig(vmName:string, config:Partial<MachineConfig>):Promise<void>;
}