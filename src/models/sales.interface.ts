export interface SalesData {
    id: number;
    year: number;
    totalSale: number;
    totalIncome: number;
  }

export interface FilteredChartData {
    labels: number[];
    totalSale?: number[];
    totalIncome: number[];
  }