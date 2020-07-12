import {mkdirSync, readdirSync, writeFile} from 'fs-extra'
import {environment} from '../environment'
import selfsigned = require('selfsigned');
import {envrionmentDataPath} from './utils'

export class Openssl {
  static async createDomainCertificate(domain: string, global: boolean) {
    const certsPath = global ? `${environment.basePath}/certs` : `${envrionmentDataPath()}/certs`
    mkdirSync(`${certsPath}`, {recursive: true})

    const pems = selfsigned.generate([
      {name: 'commonName', value: domain},
    ], {
      keySize: 2048,
      days: 730,
      algorithm: 'sha256',
    })
    await writeFile(`${certsPath}/${domain}.key`, pems.private)
    await writeFile(`${certsPath}/${domain}.crt`, pems.cert)
  }

  static async domainCertificateExists(domain: string, global: boolean) {
    const certsPath = global ? `${environment.basePath}/certs` : `${envrionmentDataPath()}/certs`

    try {
      const entries = readdirSync(certsPath)

      return Boolean(entries.find(p => p.endsWith(`${domain}.key`))) && Boolean(entries.find(p => p.endsWith(`${domain}.crt`)))
    } catch (error) {
      return false
    }
  }
}
