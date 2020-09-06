import {expect, test} from '@oclif/test'

describe('docker-machine', () => {
  test
  .stdout()
  .command(['docker-machine'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['docker-machine', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
