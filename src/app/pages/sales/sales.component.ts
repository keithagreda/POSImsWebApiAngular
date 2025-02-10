import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  SalesHeaderDto,
  SalesService,
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
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  @ViewChild(ViewSalesDetailsV1Component)
  viewSalesDetailsComponent!: ViewSalesDetailsV1Component;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<SalesHeaderDto>([]);
  visible = false;
  displayedColumns1: string[] = [
    'transNum',
    'customerName',
    'totalAmount',
    'transactionDate',
    'soldBy',
    'action',
  ];
  totalRecords = 0;

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

  getSales(event?: PageEvent) {
    const currentPage = event?.pageIndex ?? 0;
    const pageSize = event?.pageSize ?? 5;
    this._salesService
      .getSales(null, null, null, currentPage + 1, pageSize)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.dataSource.data = res.data.items ?? [];
            this.totalRecords = res.data.totalCount ?? 0;
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
