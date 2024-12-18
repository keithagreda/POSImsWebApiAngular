import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CartService } from 'src/app/services/cart.service';
import { SidebarModule } from 'primeng/sidebar';
import {
  CreateSalesDetailV1Dto,
  GetProductDropDownTableDto,
  ProductService,
} from 'src/app/services/nswag/nswag.service';

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
  sideBarVisible2 = true;
  items: GetProductDropDownTableDto[] = [];
  tempCartItem: CreateSalesDetailV1Dto[] = [];
  cartItem: CreateSalesDetailV1Dto[] = [];
  product: CreateSalesDetailV1Dto = new CreateSalesDetailV1Dto();
  constructor(
    private _productService: ProductService,
    private _cartService: CartService
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

  getCartItem() {
    this.cartItem = this._cartService.getCart();
  }

  showDialog() {}

  addToCart(product: GetProductDropDownTableDto) {}

  addQuantity(product: GetProductDropDownTableDto) {
    let addToCartDto = new CreateSalesDetailV1Dto();
    addToCartDto.productId = product.id ?? 0;
    addToCartDto.quantity = 1;
    addToCartDto.productPrice = product.price
      ? parseFloat(product.price.toFixed(2))
      : 0; // Ensure a number with two decimals
    console.log(product);
    this._cartService.addToCart(addToCartDto);
    this.getCartItem();
  }
  minusQuantity(product: GetProductDropDownTableDto) {
    let minusToCart = new CreateSalesDetailV1Dto();
    minusToCart.productId = product.id ?? 0;
    minusToCart.quantity = 1;
    minusToCart.productPrice = product.price
      ? parseFloat(product.price.toFixed(2))
      : 0; // Ensure a number with two decimals
    console.log(product);
    this._cartService.minusQuantity(minusToCart);
    this.getCartItem();
  }
}
