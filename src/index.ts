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
        this.groupEvents()
    }

    checkOverlap(currentDate: IDateItem, previousDate: IDateItem) {
        return areIntervalsOverlapping(previousDate as IDateItemInterval, currentDate as IDateItemInterval)
    }

    private groupEvents() {
        let events = Array.from(this.results)
        
        let stack = [] as any[],  
        s = 0,
        lastStartDate, lastEndDate, newEvents;
        events.sort(function(a,b){
        if(a.start > b.start) return 1;
        if(a.start < b.start) return -1;
        return 0;
        });
        while (events.length > 0) {
        stack[s] = [];
        newEvents = [];
        stack[s].push(events[0]);
        lastStartDate = events[0].start;
        lastEndDate = events[0].end;
        for (let i = 1; i < events.length; i++) {
            if (events[i].end < lastStartDate) {
            stack[s].push(events[i]);
            lastStartDate = events[i].start;
            delete events[i];
            } else if (events[i].start > lastEndDate) {
            stack[s].push(events[i]);
            lastEndDate = events[i].end;      
            }else{
            newEvents.push(events[i]);
            }
        }
            events = newEvents;
            s++;
        }
        
        stack = stack.map((item, line) => item.map((currentStackLine: object) => ({ ...currentStackLine, line: line })))
        
        this.results = stack.flat()
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