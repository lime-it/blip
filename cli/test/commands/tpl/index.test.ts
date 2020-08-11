import {expect, test} from '@oclif/test'

describe('tpl:index', () => {
  test
  .stdout()
  .command(['tpl:index'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['tpl:index', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
