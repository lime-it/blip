import {expect, test} from '@oclif/test'

describe('registry:down', () => {
  test
  .stdout()
  .command(['registry:down'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['registry:down', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
