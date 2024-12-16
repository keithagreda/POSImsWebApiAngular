import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {
  GetAllStocksReceivingDto,
  StocksService,
} from 'src/app/services/nswag/nswag.service';
import { CreateOrEditStocksReceivingModalComponent } from './create-or-edit-stocks-receiving-modal/create-or-edit-stocks-receiving-modal.component';

@Component({
  selector: 'app-stocks-receiving',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    CreateOrEditStocksReceivingModalComponent,
  ],
  templateUrl: './stocks-receiving.component.html',
  styleUrl: './stocks-receiving.component.scss',
})
export class StocksReceivingComponent implements OnInit {
  @ViewChild(CreateOrEditStocksReceivingModalComponent)
  createOrEditStocksReceivingModalComponent!: CreateOrEditStocksReceivingModalComponent;
  stocksReceivings: GetAllStocksReceivingDto[] = [];
  displayedColumns1: string[] = [
    'transNum',
    'productName',
    'quantity',
    'storageLocation',
    'dateReceived',
    'action',
  ];
  constructor(private _stocksReceivingService: StocksService) {}
  ngOnInit(): void {
    this.getAllStocksReceiving();
  }

  getAllStocksReceiving() {
    this._stocksReceivingService.getReceiveStocks().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.stocksReceivings = res.data;
          console.log(res.data);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showCreateOrEditModal(id?: string) {
    this.createOrEditStocksReceivingModalComponent.show();
  }
}
