import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import {
  CreateStocksReceivingDto,
  GetProductDropDownTableDto,
  GetStorageLocationForDropDownDto,
  ProductService,
  StocksService,
  StorageLocationService,
} from 'src/app/services/nswag/nswag.service';
import { ToastrService } from 'ngx-toastr';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';

@Component({
  selector: 'app-create-or-edit-stocks-receiving-modal',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  templateUrl: './create-or-edit-stocks-receiving-modal.component.html',
  styleUrl: './create-or-edit-stocks-receiving-modal.component.scss',
})
export class CreateOrEditStocksReceivingModalComponent implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  createOrEditReceiveStocks: CreateStocksReceivingDto =
    new CreateStocksReceivingDto();
  selectedStorageLocation: GetStorageLocationForDropDownDto =
    new GetStorageLocationForDropDownDto();
  selectedProduct: GetProductDropDownTableDto =
    new GetProductDropDownTableDto();
  storageLocations: GetStorageLocationForDropDownDto[] = [];
  products: GetProductDropDownTableDto[] = [];

  filterTextProduct = '';

  filteredProduct: GetProductDropDownTableDto[] = [];
  visible = false;
  saving = false;
  constructor(
    private _toastr: ToastrService,
    private _stocksReceivingService: StocksService,
    private _productService: ProductService,
    private _storageLocationService: StorageLocationService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getStorageLocation();
  }
  closeForm() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }

  getProducts() {
    this._productService
      .getProductDropDownTable(this.filterTextProduct, null, null)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.products = res.data.items ?? [];
            console.log(this.products);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  filterProduct(event: any) {
    this.filterTextProduct = event.query.toLowerCase();
    this.getProducts();
  }

  onProductSelect() {
    this.filterTextProduct = this.selectedProduct.name ?? '';
  }

  getStorageLocation() {
    this._storageLocationService.getAllStorageLocation().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.storageLocations = res.data;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  save() {
    this.saving = true;
    this.createOrEditReceiveStocks.productId = this.selectedProduct.id ?? 0;
    this.createOrEditReceiveStocks.storageLocationId =
      this.selectedStorageLocation.id ?? 0;
    this._stocksReceivingService
      .receiveStocks(this.createOrEditReceiveStocks)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this._toastr.success(res.data);
            this.saving = false;
            this.closeForm();
          }
        },
        error: (err) => {
          this.saving = false;
          this._toastr.error(
            'Something went wrong. While creating stocks receiving'
          );
        },
      });
  }
}
