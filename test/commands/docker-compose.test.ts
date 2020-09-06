import {expect, test} from '@oclif/test'

describe('docker-compose', () => {
  test
  .stdout()
  .command(['docker-compose'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['docker-compose', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
