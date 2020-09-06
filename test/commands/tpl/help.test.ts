import {expect, test} from '@oclif/test'

describe('tpl:help', () => {
  test
  .stdout()
  .command(['tpl:help'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['tpl:help', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
