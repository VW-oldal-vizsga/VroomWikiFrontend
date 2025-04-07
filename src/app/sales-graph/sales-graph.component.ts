import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart, ChartConfiguration, registerables, TooltipItem } from 'chart.js';
import { SalesService } from '../../services/sales.service';
import { FilteredChartData, SalesData } from '../../models/sales.interface';
import { CommonModule } from '@angular/common';


Chart.register(...registerables);


@Component({
  selector: 'app-sales-graph',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css'],
})
export class SalesGraphComponent implements OnInit {
  chart: any;
  availableYears: number[] = [];
  salesData: SalesData[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.salesService.getSalesData().subscribe((data: SalesData[]) => {
      this.salesData = data;
      this.availableYears = [...new Set(data.map((item: SalesData) => item.year))] as number[];
      this.availableYears.sort((a, b) => a - b);
      this.renderChart('all');
    });
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

  renderChart(selectedYear: string) {
    const filteredData: FilteredChartData = {
      labels: [],
      totalIncome: [],
    };
  
    if (selectedYear === 'all') {
      filteredData.labels = this.salesData.map((item) => item.year);
      filteredData.totalSale = this.salesData.map((item) => item.totalSale);
      filteredData.totalIncome = this.salesData.map((item) => item.totalIncome);
    } else {
      const yearData = this.salesData.filter((item) => item.year === +selectedYear);
      filteredData.labels = yearData.map((item) => item.year);
      filteredData.totalSale = yearData.map((item) => item.totalSale);
      filteredData.totalIncome = yearData.map((item) => item.totalIncome);
    }
  
    const chartType: 'line' | 'bar' = selectedYear === 'all' ? 'line' : 'bar';
  
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