import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart, ChartConfiguration, registerables, TooltipItem } from 'chart.js';
import { SalesService } from '../../services/sales.service';
import { FilteredChartData, SalesData } from '../../models/sales.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';


Chart.register(...registerables);


@Component({
  selector: 'app-sales-graph',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css'],
})
export class SalesGraphComponent implements OnInit {
  chart: any;
  availableYears: number[] = [];
  salesData: SalesData[] = [];
  availableYearRanges: { start: number, end: number }[] = [];
  startYear: number | null = null;
  endYear: number | null = null;


  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getSalesData().subscribe((data: SalesData[]) => {
      this.salesData = data;
      const uniqueYears = [...new Set(data.map((item: SalesData) => item.year))] as number[];
      uniqueYears.sort((a, b) => a - b);
  
      this.availableYearRanges = uniqueYears
        .filter((year) => uniqueYears.includes(year + 1) && uniqueYears.includes(year + 2))
        .map((year) => ({ start: year, end: year + 2 }));
  
      this.renderChart('all');
    });
  }

  onCustomRangeFilter() {
    if (this.startYear !== null && this.endYear !== null && this.startYear <= this.endYear) {
      this.renderChartByRange(this.startYear, this.endYear);
    }
  }

  private getChartConfig(filteredData: FilteredChartData, chartType: 'line' | 'bar'): ChartConfiguration<'line' | 'bar', number[], number> {
    return {
      type: chartType,
      data: {
        labels: filteredData.labels,
        datasets: [
          {
            label: 'Total Income (in millions)',
            data: filteredData.totalIncome,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
            spanGaps: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (in millions)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Years',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: TooltipItem<'line' | 'bar'>) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value}M`;
              },
            },
          },
        },
      },
    };
  }

  renderChartByRange(startYear: number, endYear: number) {
    const filteredData: FilteredChartData = {
      labels: [],
      totalIncome: [],
      totalSale: [],
    };
  
    const rangeData = this.salesData
      .filter(item => item.year >= startYear && item.year <= endYear)
      .sort((a, b) => a.year - b.year);
  
    filteredData.labels = rangeData.map(item => item.year);
    filteredData.totalSale = rangeData.map(item => item.totalSale);
    filteredData.totalIncome = rangeData.map(item => item.totalIncome);
  
    if (this.chart) {
      this.chart.destroy();
    }
  
    const config = this.getChartConfig(filteredData, 'line');
    this.chart = new Chart('MyChart', config);
  }

  renderChart(selectedYear: string) {
    const filteredData: FilteredChartData = {
      labels: [],
      totalIncome: [],
      totalSale: [],
    };
  
    if (selectedYear === 'all') {
      filteredData.labels = this.salesData.map((item) => item.year);
      filteredData.totalSale = this.salesData.map((item) => item.totalSale);
      filteredData.totalIncome = this.salesData.map((item) => item.totalIncome);
    } else {
      const startYear = +selectedYear;
      const endYear = startYear + 2;
  
      const rangeData = this.salesData
        .filter((item) => item.year >= startYear && item.year <= endYear)
        .sort((a, b) => a.year - b.year);
  
      filteredData.labels = rangeData.map((item) => item.year);
      filteredData.totalSale = rangeData.map((item) => item.totalSale);
      filteredData.totalIncome = rangeData.map((item) => item.totalIncome);
    }
  
    const chartType: 'line' | 'bar' = 'line';

    if (this.chart) {
      this.chart.destroy();
    }
  
    const config = this.getChartConfig(filteredData, chartType);
    this.chart = new Chart('MyChart', config);
  }
  

  onYearChange(event: Event) {
    const selectedYear = (event.target as HTMLSelectElement).value;
    this.renderChart(selectedYear);
  }
}