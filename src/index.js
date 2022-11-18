import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'

function checkOverlap(
    currentEvent: IScheduleTreePlotDate,
    nextEvent: IScheduleTreePlotDate,
    beforeEvent: IScheduleTreePlotDate
  ) {
    if (nextEvent) {
      return areIntervalsOverlapping(
        {
          start: new Date(currentEvent.start_at),
          end: new Date(currentEvent.end_at),
        },
        { start: new Date(nextEvent.start_at), end: new Date(nextEvent.end_at) }
      )
    }
    return areIntervalsOverlapping(
      {
        start: new Date(currentEvent.start_at),
        end: new Date(currentEvent.end_at),
      },
      {
        start: new Date(beforeEvent.start_at),
        end: new Date(beforeEvent.end_at),
      }
    )
  }


const plotData = (initialData) => {
    return initialData.map((item) => {
      const currentItem = { ...item }

      const intervals = currentItem.data
        .sort(
          (nextEvent, currentEvent) =>
            new Date(nextEvent.start_at).getTime() -
            new Date(currentEvent.start_at).getTime()
        )
        .map((item) => ({ ...item, overlaps: 0, line: 0 }))

      for (let i = 0; i < intervals.length; i += 1) {
        for (const interval of intervals) {
          if (checkOverlap(interval, intervals[i + 1], intervals[i - 1])) {
            intervals[i].overlaps += 1
          }
        }
      }

      let line = -1

      const isCheckOverlapping = settings?.checkOverlappingDate || false
      currentItem.data = intervals.map((event, key) => {
        line += 1

        if (isCheckOverlapping && event.overlaps === 0) {
          line -= 1
        }

        return { ...event, line, uuid: String(event.line + key) }
      })

      currentItem.totalLines =
        Math.max(...currentItem.data.map((item) => item.line)) + 1
      return currentItem as IScheduleTreePlotData
    })
  }

  plotData([
    { start_at: '2022-01-01T00:00:00', end_at: '2022-01-01T00:00:00' },
    { start_at: '2022-01-01T00:00:00', end_at: '2022-01-01T00:00:00' }
  ])