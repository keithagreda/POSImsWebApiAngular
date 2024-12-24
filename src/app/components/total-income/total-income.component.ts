import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexFill,
} from 'ng-apexcharts';
import { SalesService } from 'src/app/services/nswag/nswag.service';
import { CommonModule } from '@angular/common';

export interface totalincomeChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
}

@Component({
  selector: 'app-total-income',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, CommonModule],
  templateUrl: './total-income.component.html',
})
export class AppTotalIncomeComponent implements OnInit{
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  data: number[] = [];
  openInvTotalSales = 0;
  openInvPercentage = 0;
  public totalincomeChart!: Partial<totalincomeChart> | any;

  constructor(private _salesSerivice: SalesService) {
    
  }

  ngOnInit(): void {
    this._salesSerivice.getTotalSales().subscribe({

      next: (res) => {
        if(res.isSuccess){
          this.data = res.data.allSalesPercentage ?? [];
          this.openInvTotalSales = res.data.totalSales ?? 0;
          this.openInvPercentage = res.data.salesPercentage ?? 0;
          this.constructChart();
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  constructChart(){
    this.totalincomeChart = {
      series: [
        {
          name: 'Income',
          color: 'rgba(255, 102, 146, 1)',
          data: this.data,
        },
      ],

      chart: {
        type: 'line',
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: true,
          position: 'right',
        },
        x: {
          show: false,
        },
      },
    };
  }
}
