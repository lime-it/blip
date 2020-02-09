import execa = require('execa');
import { VmDriver, MachineSharedFolder, MachineConfig } from './driver';

export class VirtualboxDriver extends VmDriver{
    public getMachineCreateArgs(config: Partial<MachineConfig>): { [key: string]: string; } {
        const res:any={
            '--virtualbox-host-dns-resolver':null
        };

        if(config.ramSizeMB)
            res['--virtualbox-memory']=config.ramSizeMB.toString();
        
        if(config.cpuCount)
            res['--virtualbox-cpu-count']=config.cpuCount.toString();
            
        if(config.diskSizeMB)
            res['--virtualbox-disk-size']=config.diskSizeMB.toString();
    
        return res;
    }    
    public async addSharedFolder(vmName: string, name: string, hostPath: string, guestPath: string): Promise<void> {
        await execa('VBoxManage', ['sharedfolder','add',vmName,'--name',name,'--hostpath',hostPath,'--automount','--auto-mount-point',guestPath]);
    }
    public async updateSharedFolder(vmName: string, name:string, hostPath: string, guestPath: string): Promise<void> {
        const shares=await this.getSharedFolders(vmName);
        if(shares.find(p=>p.name==name && p.hostPath==hostPath))
            await this.removeSharedFolder(vmName, hostPath);

        await this.addSharedFolder(vmName, name, hostPath, guestPath);
    }
    public async removeSharedFolder(vmName: string, name: string): Promise<void> {
        await execa('VBoxManage', ['sharedfolder','remove',vmName,'--name',name]);
    }
    public async getSharedFolders(vmName: string): Promise<MachineSharedFolder[]> {
        const {stdout} = await execa('VBoxManage',['showvminfo',vmName]);

        const lines = stdout.split('\n').map(p=>p.replace('\r','').replace('\n',''));

        const shareLineIdx=lines.findIndex(p=>p.startsWith('Shared folders:') && !p.endsWith('<none>'));
        if(shareLineIdx<0)
            return [];
            
        const sharesLines = lines.slice(shareLineIdx+2, shareLineIdx+2+lines.slice(shareLineIdx+2).findIndex(p=>p.trim().length==0));
        
        return sharesLines.map(line=>{
            const props=line.split(',').map(p=>p.trim());

            return {
                name:props.find(p=>p.startsWith('Name:'))?.replace(/^Name:\s*/,'')?.replace(/^'(.*)'$/,"$1")||'',
                hostPath:props.find(p=>p.startsWith('Host path:'))?.replace(/^Host path:\s*/,'')?.replace(/^'(.*)'.+$/,"$1")||'',
                guestPath:props.find(p=>p.startsWith('mount-point:'))?.replace(/^mount-point:\s*/,'')?.replace(/^'(.*)'$/,"$1")||''
            }
        });
    }
    public async getMachineConfig(vmName: string): Promise<MachineConfig> {
        const {stdout} = await execa('VBoxManage',['showvminfo',vmName,'--machinereadable']);

        const tuples=stdout.split('\n').map(p=>p.replace('\r','').replace('\n',''));

        const diskPath = (tuples.find(p=>/\.vmdk"$/.test(p))?.split('=')[1] as string);

        const res = await execa(`VBoxManage showmediuminfo ${diskPath}`);
        const diskSize = /[0-9]+/.exec(res.stdout.split('\n').find(p=>p.startsWith('Capacity'))||'');

        return {
            cpuCount:parseInt(tuples.find(p=>p.startsWith('cpus='))?.replace('cpus=','')||'1'),
            ramSizeMB:parseInt(tuples.find(p=>p.startsWith('memory='))?.replace('memory=','')||'1'),
            diskSizeMB:parseInt(diskSize?diskSize[0]:'0')
        }
    }
    public async updateMachineConfig(vmName: string, config: Partial<MachineConfig>): Promise<void> {
        
        if(config.diskSizeMB){

            const {stdout} = await execa('VBoxManage',['showvminfo',vmName,'--machinereadable']);

            const tuples=stdout.split('\n').map(p=>p.replace('\r','').replace('\n',''));

            const diskPath = (tuples.find(p=>/\.vmdk"$/.test(p))?.split('=')[1] as string).replace(/^'(.*)'$/,"$1");
            
            await execa(`VBoxManage modifymedium ${diskPath} --resize ${config.diskSizeMB}`);
        }

        const params=[];
        
        if(config.cpuCount){
            params.push('--cpus');
            params.push(config.cpuCount.toString());
        }
        if(config.ramSizeMB){
            params.push('--memory');
            params.push(config.ramSizeMB.toString());
        }

        if(params.length>0)
            await execa('VBoxManage',['modifyvm', vmName, ...params]);
    }
}