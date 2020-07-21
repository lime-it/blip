export namespace Hooks {
  export const MachineCreate = "blip/machine:create";
  export interface MachineCreateHookArguments {
    driver: string;
  }
  
  export const MachineStart = "blip/machine:start";
  export interface MachineStartHookArguments {
    machineId: string;
  }
  
  export const MachineStop = "blip/machine:stop";
  export interface MachineStopHookArguments {
    machineId: string;
  }
  
  export const MachineDestroy = "blip/machine:destroy";
  export interface MachineDestroyHookArguments {
    machineId: string;
  }
  
  export const MachineAddSharedFolder = "blip/machine:add-shared-folder";
  export interface MachineAddSharedFolderHookArguments {
    machineId: string;
    shareName: string;
    hostPath: string;
    guestPath: string;
  }
  
  export const MachineRemoveSharedFolder = "blip/machine:remove-shared-folder";
  export interface MachineRemoveSharedFolderHookArguments {
    machineId: string;
    shareName: string;
  }
}