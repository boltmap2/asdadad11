export interface TradeDataRow {
  year: number;
  exports: number;
  imports: number;
}

export interface TradeRelationship {
  country: string;
  value: number;
}

export interface TradeVolumeResponse {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}