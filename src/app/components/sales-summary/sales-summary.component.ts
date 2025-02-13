import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import {
  SalesHeaderDto,
  SalesService,
  SalesSummaryDto,
  ViewSalesHeaderDto,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './sales-summary.component.html',
  styleUrl: './sales-summary.component.scss',
})
export class SalesSummaryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<SalesSummaryDto>([]);
  visible = false;
  displayedColumns1: string[] = [
    'customerName',
    'transNum',
    'dateTime',
    'productName',
    'quantity',
    'rate',
    'totalAmount',
    'soldBy',
  ];
  totalRecords = 0;

  constructor(
    private _toastr: ToastrService,
    private _salesService: SalesService,
    private _loadingService: LoadingService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getSales();
  }

  closeForm() {
    this.visible = false;
  }

  getSales(event?: PageEvent) {
    const currentPage = event?.pageIndex ?? 0;
    const pageSize = event?.pageSize ?? 10;
    this._salesService
      .getSalesSummary(null, currentPage + 1, pageSize)
      .subscribe({
        next: (res) => {
          console.log(res.data.items);
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
}
