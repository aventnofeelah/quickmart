import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-page container">
      <div class="page-header">
        <h1>Product Catalog</h1>
        <div class="filters">
           <select (change)="onCategoryChange($event)">
             <option value="">All Categories</option>
             <option *ngFor="let cat of categories" [value]="cat.id">{{cat.name}}</option>
           </select>
           <select (change)="onSortChange($event)">
              <option value="name">By Name</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
           </select>
        </div>
      </div>

      <div class="grid grid-cols-4" *ngIf="!loading; else loadingTemplate">
        <div class="product-card" *ngFor="let p of products">
          <div class="p-img">
             <img [src]="p.image_url" *ngIf="p.image_url" alt="{{p.name}}" class="product-image">
             <div class="no-img" *ngIf="!p.image_url"><i class="fas fa-image"></i></div>
          </div>
          <div class="p-info">
             <h3>{{p.name}}</h3>
             <p>{{ (p.description || '') | slice:0:60 }}...</p>
             <div class="p-bottom">
                <span class="p-price">{{p.price | number}} KZT</span>
                <button class="btn btn-primary btn-sm" (click)="addToCart(p)"><i class="fas fa-cart-plus"></i></button>
             </div>
          </div>
        </div>
      </div>

      <ng-template #loadingTemplate>
        <div class="loader">Loading products...</div>
      </ng-template>

      <div class="no-products" *ngIf="!loading && products.length === 0">
        No products found.
      </div>
    </div>
  `,
  styles: [`
    .products-page {
      padding: 40px 0;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
    .filters {
      display: flex;
      gap: 15px;
    }
    .filters select {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-family: inherit;
    }
    .product-card {
      background: white;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      transition: var(--transition);
    }
    .product-card:hover {
      box-shadow: var(--shadow-hover);
      transform: translateY(-5px);
    }
    .p-img {
      height: 200px;
      background: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .no-img {
      font-size: 3rem;
      color: #ccc;
    }
    .p-info {
      padding: 20px;
    }
    .p-info h3 {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }
    .p-info p {
      font-size: 0.9rem;
      color: var(--text-light);
      margin-bottom: 20px;
    }
    .p-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .p-price {
      font-weight: 700;
      font-size: 1.2rem;
    }
    .btn-sm {
      padding: 8px 12px;
      min-width: 40px;
    }
    .loader, .no-products {
      text-align: center;
      padding: 100px 0;
      font-size: 1.2rem;
      color: var(--text-light);
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading = true;

  constructor(private api: ApiService, private cart: CartService) {}
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadProducts();
    this.api.getCategories().subscribe({
      next: (res) => {
        this.categories = res && res.results ? res.results : (Array.isArray(res) ? res : []);
        this.cdr.detectChanges();
      },
      error: (err) => {}
    });
  }

  loadProducts(params?: any) {
    this.loading = true;
    this.api.getProducts(params).subscribe({
      next: (res) => {
        this.products = res && res.results ? res.results : (Array.isArray(res) ? res : []);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onCategoryChange(event: any) {
    const category = event.target.value;
    this.loadProducts(category ? { category } : {});
  }

  onSortChange(event: any) {
    const ordering = event.target.value;
    this.loadProducts({ ordering });
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
    alert(`${product.name} added to cart!`);
  }
}
