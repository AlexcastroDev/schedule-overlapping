import { IDateItem, IDateItemInterval } from './types';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'

class DistributeDateOverlap {
    private dateItems = [] as IDateItem[]
    public results = [] as IDateItem[]

    constructor(dates: IDateItem[]) {
        this.dateItems = dates
        this.results = this.sortDates(dates).map(item => {
            const start = typeof item.start === 'string' ? new Date(item.start) : item.start
            const end = typeof item.end === 'string' ? new Date(item.end) : item.end
            
            return {
                ...item,
                start,
                end,
                line: 0
            }
        })
        this.calculationOverlapDates()
    }

    checkOverlap(currentDate: IDateItem, previousDate: IDateItem) {
        return areIntervalsOverlapping(previousDate as IDateItemInterval, currentDate as IDateItemInterval)
    }

    hasOverlapBehind(indexLimit: number, currentRange: IDateItem) {
        let overlapBehind = false

        // Representation of behind currentIndex = (indexLimit - 1)
        for (let i = 0; i <= indexLimit - 1; i += 1) {
            if(this.checkOverlap(currentRange, this.results[i])) {
                overlapBehind = true
                break;
            }
        }

        return overlapBehind
    }

    calculationOverlapDates() {
        this.results.forEach((currentDateItem, currentIndex) => {
            if(currentIndex > 0 && this.hasOverlapBehind(currentIndex, currentDateItem)) {
                this.results[currentIndex].line = (this.results[currentIndex].line || 0) + 1
            }
        })
    }

    sortDates(db: IDateItem[]) {
        return db.sort((nextEvent, currentEvent) => new Date(nextEvent.start).getTime() - new Date(currentEvent.start).getTime())
    }

    get initialDate() {
        return this.dateItems
    }

    get resultsWithISOFormat() {
        return this.results.map(item => { 
            const start = (item.start as Date).toISOString()
            const end = (item.end as Date).toISOString()

            return {
                ...item,
                start,
                end
            }
        })
    } 
}

export default DistributeDateOverlap