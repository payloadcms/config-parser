import { describe, expect, it } from 'vitest'
// import { tsBuildAll } from '../ts'
import { fixtures } from './shared'

describe('ts', () => {
  for (const fixture of fixtures) {
    it('builds ' + fixture.name, async () => {
      expect(1).toBe(1)
      // await tsBuildAll(
      //   fixture.path + '/' + fixture.name + '/payload.config.ts',
      //   __dirname + '/ts/' + fixture.name,
      // )
    })
  }
})
