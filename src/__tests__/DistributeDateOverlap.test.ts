import DistributeDateOverlap from ".."
import { db1, db1Results } from "../__mocks__"

describe('DistributeDateOverlap Class', () => {
    it('UseCase: Same Date', () => {
        const results = new DistributeDateOverlap(db1).resultsWithISOFormat
        expect(results).toEqual(db1Results)
    })
})
