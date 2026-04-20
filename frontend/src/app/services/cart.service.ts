import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  addToCart(product: any) {
    const existing = this.cartItems.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  getCartItems() {
    return this.cartItems;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartCountSubject.next(this.getTotalCount());
  }

  private loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartCountSubject.next(this.getTotalCount());
    }
  }

  private getTotalCount() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
}
