export interface Interval {
    duration: number,
    task?: string,
    id?: string,
    tasks?: List[],
}

export interface TimerProps {
    timespan: number,
    tasks?: List[],
    interval?: number,
}