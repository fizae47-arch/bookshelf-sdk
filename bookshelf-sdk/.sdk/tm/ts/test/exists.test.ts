
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BookshelfSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BookshelfSDK.test()
    equal(testsdk instanceof BookshelfSDK, true,
      'BookshelfSDK.test() must return a client synchronously')
  })

})
