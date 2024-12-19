import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CartService } from 'src/app/services/cart.service';
import { SidebarModule } from 'primeng/sidebar';
import {
  CreateOrEditSalesV1Dto,
  CreateSalesDetailV1Dto,
  GetProductDropDownTableDto,
  ProductService,
  SalesService,
} from 'src/app/services/nswag/nswag.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test-component',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    DialogModule,
    SidebarModule,
  ],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponentComponent implements OnInit {
  sideBarVisible2 = false;
  saving = false;
  items: GetProductDropDownTableDto[] = [];
  tempCartItem: CreateSalesDetailV1Dto[] = [];
  cartItem: CreateSalesDetailV1Dto[] = [];
  product: CreateSalesDetailV1Dto = new CreateSalesDetailV1Dto();
  selectedProduct: CreateSalesDetailV1Dto = new CreateSalesDetailV1Dto();
  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _toastr: ToastrService,
    private _salesService: SalesService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.getCartItem();
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

  placeOrder() {
    this.saving = true;
    const cartData = localStorage.getItem('cart');

    if (!cartData) {
      console.error('Cart is empty');
      return;
    }

    // Parse JSON data
    const parsedCartData = JSON.parse(cartData);

    // Map parsed data to SalesDetail instances
    const createSalesDetailV1Dto = parsedCartData.map(
      (item: any) => new CreateSalesDetailV1Dto(item)
    );

    const salesDto = {
      salesHeaderId: null,
      customerId: null,
      createSalesDetailV1Dto: createSalesDetailV1Dto, // Use the mapped instances here
    };

    const salesDtoInstance: CreateOrEditSalesV1Dto = Object.assign(
      new CreateOrEditSalesV1Dto(),
      salesDto
    );

    console.log('salesDtoInstance', salesDtoInstance); // Log the final DTO for debugging

    this._salesService.createSales(salesDtoInstance).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.isSuccess) {
          Swal.fire({
            title: 'Success!',
            text: 'Sales Transaction Saved!',
            icon: 'success',
          });
        }
      },
      error: (err) => {
        this.saving = false;
        console.error(err); // Log error for debugging
      },
    });
  }

  saveTransaction() {
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

  getCartItem() {
    this.cartItem = this._cartService.getCart();
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

  // addQuantity(product: GetProductDropDownTableDto) {
  //   let addToCartDto = new CreateSalesDetailV1Dto();
  //   addToCartDto.productId = product.id ?? 0;
  //   addToCartDto.quantity = 1;
  //   addToCartDto.productPrice = product.price
  //     ? parseFloat(product.price.toFixed(2))
  //     : 0; // Ensure a number with two decimals
  //   console.log(product);
  //   this._cartService.addToCart(addToCartDto);
  //   this.getCartItem();
  // }
  // minusQuantity(product: GetProductDropDownTableDto) {
  //   let minusToCart = new CreateSalesDetailV1Dto();
  //   minusToCart.productId = product.id ?? 0;
  //   minusToCart.quantity = 1;
  //   minusToCart.productPrice = product.price
  //     ? parseFloat(product.price.toFixed(2))
  //     : 0; // Ensure a number with two decimals
  //   console.log(product);
  //   this._cartService.minusQuantity(minusToCart);
  //   this.getCartItem();
  // }
}
