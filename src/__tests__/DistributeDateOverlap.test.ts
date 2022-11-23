import DistributeDateOverlap from ".."
import { db1, db1Results } from "../__mocks__"

describe('DistributeDateOverlap Class', () => {
    it('UseCase: Same Date', () => {
        const results = new DistributeDateOverlap(db1).resultsWithISOFormat
        console.log("🚀 ~ file: DistributeDateOverlap.test.ts ~ line 7 ~ it ~ results", results)
        expect(results).toEqual(db1Results)
    })
})