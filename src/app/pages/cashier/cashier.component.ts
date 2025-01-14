import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { MaterialModule } from 'src/app/material.module';
import { CartService } from 'src/app/services/cart.service';
import {
  CreateOrEditSalesV1Dto,
  CreateSalesDetailV1Dto,
  CustomerDropDownDto,
  CustomerService,
  GetProductDropDownTableDto,
  ProductService,
  SalesService,
} from 'src/app/services/nswag/nswag.service';
import Swal from 'sweetalert2';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-cashier',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    DialogModule,
    SidebarModule,
    AutoCompleteModule,
  ],
  templateUrl: './cashier.component.html',
  styleUrl: './cashier.component.scss',
})
export class CashierComponent implements OnInit {
  sideBarVisible2 = false;
  saving = false;
  items: GetProductDropDownTableDto[] = [];
  tempCartItem: CreateSalesDetailV1Dto[] = [];
  cartItem: CreateSalesDetailV1Dto[] = [];
  product: CreateSalesDetailV1Dto = new CreateSalesDetailV1Dto();
  selectedProduct: CreateSalesDetailV1Dto = new CreateSalesDetailV1Dto();
  visible = false;
  customerName = '';
  customerNames: string[] = [];
  filterCustomerName: string = '';
  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _customerService: CustomerService,
    private _toastr: ToastrService,
    private _salesService: SalesService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCartItem();
    this.getCustomerNames();
  }

  getProducts() {
    this._productService
      .getProductDropDownTable(null, null, null)
      .subscribe((res) => {
        if (res.isSuccess) {
          this.items = res.data.items ?? [];
        }
      });
  }

  getCustomerNames() {
    this._customerService
      .customerDropDown(this.filterCustomerName, null, null)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.customerNames = [];
            res.data.items?.map((item) => {
              this.customerNames.push(item.customerFullName ?? '');
            });
            console.log(this.customerNames);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  filterProduct(event: any) {
    this.getCustomerNames();
  }

  onCustomerSelect() {
    this.customerName = this.filterCustomerName ?? '';
    console.log(this.customerName);
  }

  closeForm() {
    this.visible = false;
  }

  placeOrder() {
    this.saving = true;
    const cartData = localStorage.getItem('cart');

    if (!cartData) {
      console.error('Cart is empty');
      return;
    }

    // Parse JSON data
    const parsedCartData = JSON.parse(cartData);

    console.log(parsedCartData);

    // Map parsed data to SalesDetail instances
    const createSalesDetailV1Dto = parsedCartData.map(
      (item: CreateSalesDetailV1Dto) => {
        const dto = CreateSalesDetailV1Dto.fromJS({
          productId: item.productId,
          actualSellingPrice: item.actualSellingPrice,
          quantity: item.quantity,
        });
        return dto;
      }
    );

    console.log('sales detail', createSalesDetailV1Dto);

    const salesDto = CreateOrEditSalesV1Dto.fromJS({
      salesHeaderId: null,
      customerName: this.customerName,
      createSalesDetailV1Dto: createSalesDetailV1Dto,
    });

    console.log('salesDtoInstance', salesDto); // Log the final DTO for debugging

    this._salesService.createSales(salesDto).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.isSuccess) {
          Swal.fire({
            title: 'Success!',
            text: 'Sales Transaction Saved!',
            icon: 'success',
          });
          this._cartService.clearCart();
        }
      },
      error: (err) => {
        this.saving = false;
        console.error(err); // Log error for debugging
      },
    });
  }

  saveTransaction() {
    this.visible = false;
    this.sideBarVisible2 = false;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#635bff',
      cancelButtonColor: '#ff6692',
      confirmButtonText: 'Confirm',
      customClass: {
        popup: 'custom-swal-popup',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.placeOrder();
      }
    });
  }

  insertCustomer() {
    this.visible = true;
  }

  getCartItem() {
    this.cartItem = this._cartService.getCart();
    //if it has value trigger update cart
    if (this.cartItem.length > 0) {
      this.updateCartPrices();
    }
  }

  updateCartPrices() {
    this._productService.getProductDetailsForCart(this.cartItem).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.cartItem = res.data;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showControl(
    selectedItem: GetProductDropDownTableDto,
    items: GetProductDropDownTableDto[]
  ) {
    if (selectedItem.showControl) {
      return;
    }
    this.selectedProduct = new CreateSalesDetailV1Dto();
    this.selectedProduct.productId = selectedItem.id ?? 0;
    this.selectedProduct.productName = selectedItem.name;
    this.selectedProduct.quantity = 1;
    this.selectedProduct.productPrice = selectedItem.price;
    items.forEach((item) => {
      item.showControl = item === selectedItem ? !item.showControl : false;
    });
  }

  addQuantity(product: GetProductDropDownTableDto) {
    this.selectedProduct.productId = product.id ?? 0;
    this.selectedProduct.quantity = (this.selectedProduct.quantity || 0) + 1;
    this.selectedProduct.productName = product.name;
    this.selectedProduct.productPrice = product.price;

    // this._cartService.addToCart(addToCartDto);
    // this.getCartItem();
  }
  minusQuantity(product: GetProductDropDownTableDto) {
    if ((this.selectedProduct.quantity || 0) <= 1) return;
    this.selectedProduct.productId = product.id ?? 0;
    this.selectedProduct.quantity = (this.selectedProduct.quantity || 0) - 1;
    this.selectedProduct.productName = product.name;
    this.selectedProduct.productPrice = product.price;
  }

  showDialog() {
    this.sideBarVisible2 = true;
    this.getCartItem();
  }

  actualSellingPriceHandler(item: CreateSalesDetailV1Dto) {
    this._cartService.actualSellingPriceHandler(
      item.productId,
      item.actualSellingPrice ?? 0
    );
  }

  addToCart(item: GetProductDropDownTableDto) {
    this.showDialog();
    this._cartService.addToCart(this.selectedProduct);
    item.showControl = false;
    this.selectedProduct = new CreateSalesDetailV1Dto();
    this.getCartItem();
  }

  cartQuantityHandler(productId: number, operator: number) {
    this._cartService.productQuantityHandler(productId, operator);
    this.getCartItem();
  }

  removeItem(productId: number) {
    this._cartService.removeFromCart(productId);
    this.getCartItem();
  }
}
