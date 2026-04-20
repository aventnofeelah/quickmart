import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/`);
  }

  getProducts(params?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/`, { params });
  }

  createProduct(product: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(`${this.baseUrl}/products/`, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}/`);
  }

  getCategoryProducts(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}/products/`);
  }
  
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/`, orderData);
  }

  getUserOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/`);
  }
}
