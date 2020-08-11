import {expect, test} from '@oclif/test'

describe('init:ls', () => {
  test
  .stdout()
  .command(['init:ls'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['init:ls', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
