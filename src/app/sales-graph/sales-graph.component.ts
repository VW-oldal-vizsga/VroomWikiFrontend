import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-sales-graph',
  standalone:true,
  imports: [NavbarComponent],
  templateUrl: './sales-graph.component.html',
  styleUrl: './sales-graph.component.css'
})
export class SalesGraphComponent implements OnInit {
  public config: any = {
    type: 'line',

    data: {
      labels: ['JAN','FEB','MAR','APRIL','MAY','JUNE','JULY'],
      datasets: [
        {
          label: 'Sales',
          data: ['160','170',null,'180','200'],
          backgroundColor: 'rgb(255, 99, 132)',
          fill: false,
          spanGaps: true,
          borderColor: "rgb(255, 99, 132)"

        },
        {
          label: 'PAT',
          data: ['100','120','133','134'],
          backgroundColor: 'red',
          fill: false,
          spanGaps: true,
          borderColor: "red"
        },
      ],
    },
    options: {
      aspectRatio: 1,
    },
  };
  chart: any;
  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config)
  }
}


