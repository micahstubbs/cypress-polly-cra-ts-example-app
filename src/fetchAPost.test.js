import { Polly } from '@pollyjs/core'
import FetchAdapter from '@pollyjs/adapter-fetch'
import LocalStoragePersister from '@pollyjs/persister-local-storage'

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(FetchAdapter)
Polly.register(LocalStoragePersister)

describe('Simple Example', function () {
  it('fetches a post', async function () {
    /*
      Create a new polly instance.

      Connect Polly to fetch. By default, it will record any requests that it
      hasn't yet seen while replaying ones it has already recorded.
    */
    const polly = new Polly('Simple Example', {
      adapters: ['fetch'], // Hook into `fetch`
      persister: 'local-storage', // Read/write to/from local-storage
      logging: true, // Log requests to console
    })

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const post = await response.json()

    expect(response.status).toEqual(200)
    expect(post.id).toEqual(1)

    /*
      Calling `stop` will persist requests as well as disconnect from any
      connected adapters.
    */
    await polly.stop()
  })
})
