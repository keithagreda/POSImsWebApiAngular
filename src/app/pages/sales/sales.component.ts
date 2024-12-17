import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import {
  SalesHeaderDto,
  SalesService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [DialogModule, CommonModule, MaterialModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent implements OnInit {
  salesHeadersDto: SalesHeaderDto[] = [];
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
}
