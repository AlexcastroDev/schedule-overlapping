function checkOverlap(A, B){
  return (A.start <= B.end && B.start <= A.end)
}

let db = [
      {
        start: '2022-11-09 01:00:00',
        end: '2022-11-09 04:00:00',
        overlaps: 0,
        line: 0,
      },
      {
        start: '2022-11-09 02:00:00',
        end: '2022-11-09 06:00:00',
        overlaps: 0,
        line: 0,
      },
      {
        start: '2022-11-09 04:00:00',
        end: '2022-11-09 07:00:00',
        overlaps: 0,
        line: 0,
      },
      {
        start: '2022-11-09 03:00:00',
        end: '2022-11-09 06:00:00',
        overlaps: 0,
        line: 0,
      },
 ];

const intervals = db.sort((nextEvent, currentEvent) => new Date(nextEvent.start).getTime() - new Date(currentEvent.start).getTime())


for (let i = 0; i < intervals.length - 1; i += 1) {
  for (const interval of intervals) {
    if(checkOverlap(interval, intervals[i + 1])) {
      intervals[i].overlaps += 1 
   }
  }
}

let line = -1
db = db.map((event) => {
  if(event.overlaps > 0) {
    line += 1
  } else {
    line = 0
  }
  return {...event, line  }
})



