export type IDateItem = {
    start: string | Date
    end: string | Date
    line?: number
    row?: unknown
}

export type IDateItemInterval = {
    start: Date
    end: Date
}