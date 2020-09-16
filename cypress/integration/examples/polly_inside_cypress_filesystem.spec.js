import { Polly } from '@pollyjs/core'
import FetchAdapter from '@pollyjs/adapter-fetch'
import FSPersister from '@pollyjs/persister-fs'

/*
  Register the adapters and persisters we want to use. This way all future
  polly instances can access them by name.
*/
Polly.register(FetchAdapter)
Polly.register(FSPersister)

describe('Simple Example', function () {
  it('fetches a post', async function () {
    /*
      Create a new polly instance.

      Connect Polly to fetch. By default, it will record any requests that it
      hasn't yet seen while replaying ones it has already recorded.
    */
    const polly = new Polly('File System Example', {
      adapters: ['fetch'], // Hook into `fetch`
      persister: 'fs', // Read/write to/from file system
      logging: true, // Log requests to console
    })

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const post = await response.json()

    expect(response.status).to.equal(200)
    expect(post.id).to.equal(1)

    /*
      Calling `stop` will persist requests as well as disconnect from any
      connected adapters.
    */
    await polly.stop()
  })
})
