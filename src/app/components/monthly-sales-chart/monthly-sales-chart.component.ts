import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SalesService } from 'src/app/services/nswag/nswag.service';
import { LoadingService } from 'src/app/services/loading.service';

export interface MonthlySalesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
  xaxis: ApexXAxis;
}

@Component({
  selector: 'app-monthly-sales-chart',
  standalone: true,
  imports: [MaterialModule, NgApexchartsModule, CommonModule],
  templateUrl: './monthly-sales-chart.component.html',
  styleUrls: ['./monthly-sales-chart.component.scss'],
})
export class MonthlySalesChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  data: number[] = [];
  categories: string[] = [];
  openInvTotalSales = 0;
  openInvPercentage = 0;
  public totalincomeChart!: Partial<MonthlySalesChart> | any;

  constructor(
    private _salesSerivice: SalesService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._loadingService.show();
    this._salesSerivice.getPerMonthSales(null).subscribe({
      next: (res) => {
        res.data.forEach((element) => {
          this.data.push(element.totalMonthlySales ?? 0);
          this.categories.push(element.month ?? 'N/A');
        });
        this.constructChart();
        this._loadingService.hide();
      },
      error: (err) => {
        console.error(err);
        this._loadingService.hide();
      },
    });
  }

  constructChart() {
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
        height: 350,
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
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: { fontSize: '13px', colors: '#adb0bb', fontWeight: '400' },
        },
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: true,
          position: 'right',
        },
      },
    };
  }
}
