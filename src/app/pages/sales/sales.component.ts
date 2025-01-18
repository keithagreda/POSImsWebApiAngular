import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  SalesHeaderDto,
  SalesService,
  ViewSalesDetailDto,
  ViewSalesHeaderDto,
} from 'src/app/services/nswag/nswag.service';
import { ViewSalesDetailsV1Component } from 'src/app/components/view-sales-details-v1/view-sales-details-v1.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    MaterialModule,
    ViewSalesDetailsV1Component,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  @ViewChild(ViewSalesDetailsV1Component)
  viewSalesDetailsComponent!: ViewSalesDetailsV1Component;
  salesHeadersDto: SalesHeaderDto[] = [];
  visible = false;
  displayedColumns1: string[] = [
    'transNum',
    'customerName',
    'totalAmount',
    'transactionDate',
    'soldBy',
    'action',
  ];
  constructor(
    private _toastr: ToastrService,
    private _salesService: SalesService,
    private _loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.getSales();
  }

  closeForm() {
    this.visible = false;
  }

  getSales() {
    this._salesService.getSales(null, null, null, null, null).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.salesHeadersDto = res.data.items ?? [];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showSalesDetails(headerId: string) {
    this.visible = true;
    this._loadingService.show();
    let viewSalesHeaderDto: ViewSalesHeaderDto = new ViewSalesHeaderDto();
    this._salesService.viewSales(headerId, null, null, null).subscribe({
      next: (res) => {
        this._loadingService.hide();
        if (
          res.isSuccess &&
          res.data &&
          res.data.items &&
          res.data.items.length > 0
        ) {
          viewSalesHeaderDto = res.data.items[0];
          console.log();

          this.viewSalesDetailsComponent.show(viewSalesHeaderDto);
        } else {
          console.warn('No sales data available');
          this._toastr.error('No Sales Detail Available');
        }
      },
      error: (error) => {
        this._loadingService.hide();
        this._toastr.error('Something went wrong.. ' + error);
      },
    });
  }
}
