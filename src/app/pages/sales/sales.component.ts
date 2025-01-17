import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  SalesHeaderDto,
  SalesService,
} from 'src/app/services/nswag/nswag.service';
import { ViewSalesDetailsComponent } from '../../components/view-sales-details/view-sales-details.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    MaterialModule,
    ViewSalesDetailsComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  @ViewChild(ViewSalesDetailsComponent)
  viewSalesDetailsComponent!: ViewSalesDetailsComponent;
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
    private _salesService: SalesService
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

  showSalesDetails() {
    this.visible = true;
    this.viewSalesDetailsComponent.show();
  }
}
