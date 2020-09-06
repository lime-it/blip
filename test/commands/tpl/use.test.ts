import {expect, test} from '@oclif/test'

describe('tpl:use', () => {
  test
  .stdout()
  .command(['tpl:use'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['tpl:use', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
