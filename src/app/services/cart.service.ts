import { Injectable } from '@angular/core';
import { CreateSalesDetailV1Dto } from './nswag/nswag.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  getCart(): CreateSalesDetailV1Dto[] {
    //bind storage key to emp id
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: CreateSalesDetailV1Dto): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);
    if (existingItem) {
      //assign to variables for readability
      const existingQuantity = existingItem.quantity || 0;
      const existingProductPrice = existingItem.productPrice || 0;
      const newQty = item.quantity || 0;
      const newProductPrice = item.productPrice || 0;
      //multiple new product price to new qty
      const newProductPriceCalc = newProductPrice * newQty;

      //calculation add existing price to new inputs
      existingItem.quantity = existingQuantity + newQty;
      existingItem.productPrice = existingProductPrice + newProductPriceCalc;
    } else {
      const newPrice = (item.productPrice || 0) * (item.quantity || 0);
      item.productPrice = newPrice;
      cart.push(item);
    }
    this.saveCart(cart);
  }

  actualSellingPriceHandler(
    productId: number,
    actualSellingPrice: number
  ): number {
    if (productId == 0) {
      return 0;
    }
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === productId);
    if (!existingItem) {
      return 0;
    }

    existingItem.actualSellingPrice = actualSellingPrice;
    this.saveCart(cart);
    return 1;
  }

  productQuantityHandler(productId: number, operator: number): number {
    if (productId == 0) {
      return 0;
    }
    if (operator == 0) {
      return 0;
    }
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === productId);
    if (!existingItem) {
      return 0;
    }

    existingItem.actualSellingPrice = 0;

    //if subtract
    if (operator < 0) {
      if ((existingItem.quantity || 0) <= 1) {
        this.removeFromCart(productId);
        return 1;
      }
      const productPrice =
        (existingItem.productPrice || 0) / (existingItem.quantity || 0);
      existingItem.quantity = (existingItem.quantity || 0) + operator;
      existingItem.productPrice =
        (existingItem.productPrice || 0) - productPrice;
      this.saveCart(cart);
      return 1;
    }
    //if add
    if (operator > 0) {
      const productPrice =
        (existingItem.productPrice || 0) / (existingItem.quantity || 0);
      const existingQuantity = existingItem.quantity || 0;
      const existingProductPrice = existingItem.productPrice || 0;
      //multiple new product price to new qty

      //calculation add existing price to new inputs
      existingItem.quantity = existingQuantity + 1;
      existingItem.productPrice = existingProductPrice + productPrice;
      this.saveCart(cart);
      return 1;
    }
    return 0;
  }

  minusQuantity(item: CreateSalesDetailV1Dto): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);
    if (existingItem) {
      if ((existingItem.quantity || 0) <= 1) {
        this.removeFromCart(item.productId);
        return;
      }
      existingItem.quantity =
        (existingItem.quantity || 0) - (item.quantity || 0);
      existingItem.productPrice =
        (existingItem.productPrice || 0) - (item.productPrice || 0);
    }
    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter((item) => item.productId !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  private saveCart(cart: CreateSalesDetailV1Dto[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    console.log(cart);
  }
}
