import {expect, test} from '@oclif/test'

describe('tpl:ls', () => {
  test
  .stdout()
  .command(['tpl:ls'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['tpl:ls', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
