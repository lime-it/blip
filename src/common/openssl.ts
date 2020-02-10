import { mkdirSync, readdirSync } from 'fs';
import { environment } from '../environment';
import selfsigned = require('selfsigned');
import { envrionmentDataPath, writeFilePromise } from './utils';

export class Openssl{
    static async createDomainCertificate(domain:string, global:boolean){
    
        const certsPath=global?`${environment.basePath}/certs`:`${envrionmentDataPath()}/certs`;
        mkdirSync(`${certsPath}`, {recursive:true});

        const pems = selfsigned.generate([
                {name:'commonName', value:domain}
            ], {
            keySize: 2048,
            days: 730,
            algorithm: 'sha256'
        });
        await writeFilePromise(`${certsPath}/${domain}.key`,pems.private);
        await writeFilePromise(`${certsPath}/${domain}.crt`,pems.cert);
        
    }
    static async domainCertificateExists(domain:string, global:boolean){
    
        const certsPath=global?`${environment.basePath}/certs`:`${envrionmentDataPath()}/certs`;
        
        try{
            const entries = readdirSync(certsPath);
    
            return !!entries.find(p=>p.endsWith(`${domain}.key`)) && !!entries.find(p=>p.endsWith(`${domain}.crt`))
        }
        catch(err){
            return false;
        }
    }
}