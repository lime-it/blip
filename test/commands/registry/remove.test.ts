import {expect, test} from '@oclif/test'

describe('registry:remove', () => {
  test
  .stdout()
  .command(['registry:remove'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['registry:remove', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
