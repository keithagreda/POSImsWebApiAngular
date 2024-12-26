import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MaterialModule } from 'src/app/material.module';
import {
  CurrentInventoryDto,
  InventoryService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-current-stocks',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './current-stocks.component.html',
  styleUrl: './current-stocks.component.scss',
})
export class CurrentStocksComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'received',
    'sales',
    'currentStock',
  ];
  dataSource: CurrentInventoryDto[] = [];
  loading = false;

  constructor(private _inventoryService: InventoryService) {}
  ngOnInit(): void {
    this.loading = true;
    this._inventoryService.getCurrentStocks().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.isSuccess) {
          this.dataSource = res.data;
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
