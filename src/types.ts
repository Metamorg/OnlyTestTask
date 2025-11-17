
export interface HistoricalEvent {
  year: number;
  description: string;
}

export interface TimePeriod {
  id: number;
  category: string;
  startYear: number;
  endYear: number;
  events: HistoricalEvent[];
}
