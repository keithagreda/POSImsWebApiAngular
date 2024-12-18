import { Injectable } from '@angular/core';
import { CreateSalesDetailV1Dto } from './nswag/nswag.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cart';
  getCart(): CreateSalesDetailV1Dto[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: CreateSalesDetailV1Dto): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity =
        (existingItem.quantity || 0) + (item.quantity || 0);
      existingItem.productPrice =
        (existingItem.productPrice || 0) + (item.productPrice || 0);
    } else {
      cart.push(item);
    }
    this.saveCart(cart);
  }

  minusQuantity(item: CreateSalesDetailV1Dto): void {
    const cart = this.getCart();
    const existingItem = cart.find((i) => i.productId === item.productId);
    if (existingItem) {
      debugger;
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
