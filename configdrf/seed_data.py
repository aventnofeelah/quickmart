import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configdrf.settings')
django.setup()

from core.models import Category, Product

def seed():
    # 1. Create Categories
    categories_data = ['Electronics', 'Clothing', 'Home & Garden', 'Groceries', 'Toys']
    categories = []
    for name in categories_data:
        cat, created = Category.objects.get_or_create(name=name)
        categories.append(cat)
    
    print(f"Created {len(categories)} categories.")

    # 2. Create Products
    products_data = [
        # Electronics
        ('iPhone 15 Pro', 550000, 'The latest Apple smartphone with titanium body.', 10, 'Electronics', '/assets/products/iphone15.png'),
        ('MacBook Air M2', 650000, 'Thinnest and lightest laptop from Apple.', 5, 'Electronics', '/assets/products/macbook.png'),
        ('iPad Pro', 450000, 'Powerful tablet for professional work.', 8, 'Electronics', '/assets/products/tablet.png'),
        ('Sony Headphones', 150000, 'Industry leading noise canceling headphones.', 15, 'Electronics', '/assets/products/headphones.png'),
        ('Mirrorless Camera', 350000, 'Compact camera with professional image quality.', 4, 'Electronics', '/assets/products/camera.png'),
        
        # Clothing
        ('Cotton T-Shirt', 5000, 'Comfortable 100% cotton t-shirt.', 50, 'Clothing', '/assets/products/tshirt.png'),
        ('Running Shoes', 25000, 'Sport shoes for maximum comfort while running.', 20, 'Clothing', '/assets/products/shoes.png'),
        ('Denim Jeans', 15000, 'Classic blue denim jeans, regular fit.', 30, 'Clothing', '/assets/products/jeans.png'),
        ('Winter Jacket', 45000, 'Warm waterproof jacket for cold weather.', 12, 'Clothing', '/assets/products/jacket.png'),
        ('Designer Sunglasses', 12000, 'Fashionable sunglasses with UV protection.', 25, 'Clothing', '/assets/products/sunglasses.png'),
        
        # Home & Garden
        ('Robotic Vacuum', 120000, 'Smart helper for your home cleaning.', 15, 'Home & Garden', '/assets/products/vacuum.png'),
        ('Modern Desk Lamp', 15000, 'Adjustable lighting for your workspace.', 20, 'Home & Garden', '/assets/products/lamp.png'),
        ('Garden Tools Set', 8000, 'Essential tools for your backyard garden.', 25, 'Home & Garden', '/assets/products/tools.png'),
        ('Indoor Plant', 5000, 'Easy-to-care decorative indoor plant.', 30, 'Home & Garden', '/assets/products/plant.png'),
        ('Electric Kettle', 18000, 'Quick boil stainless steel kettle.', 15, 'Home & Garden', '/assets/products/kettle.png'),
        
        # Groceries
        ('Organic Coffee', 4500, 'Premium arabica roasted coffee beans.', 100, 'Groceries', '/assets/products/coffee.png'),
        ('Artisanal Pasta', 1200, 'High-quality durum wheat pasta from Italy.', 150, 'Groceries', 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400'),
        ('Fresh Fruit Basket', 6500, 'Assortment of fresh seasonal organic fruits.', 20, 'Groceries', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400'),
        ('Natural Whole Milk', 900, 'Fresh farm milk in a glass bottle.', 80, 'Groceries', 'https://images.unsplash.com/photo-1563636619-e910f01859ec?auto=format&fit=crop&q=80&w=400'),
        ('Dark Chocolate Bar', 2500, 'Handcrafted 70% cocoa artisan chocolate.', 60, 'Groceries', 'https://images.unsplash.com/photo-1511381939415-e4401546383a?auto=format&fit=crop&q=80&w=400'),

        # Toys
        ('Building blocks set', 15000, 'Creative construction set for children.', 25, 'Toys', 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&q=80&w=400'),
        ('Classic Doll', 9000, 'Beautifully designed doll with accessories.', 15, 'Toys', 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&q=80&w=400'),
        ('Remote Control Car', 20000, 'High-speed RC car with rechargeable battery.', 10, 'Toys', 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400'),
        ('Jigsaw Puzzle', 5500, '1000-piece puzzle with scenic image.', 30, 'Toys', 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400'),
        ('Teddy Bear Plush', 7000, 'Soft and huggable premium plush toy.', 40, 'Toys', 'https://images.unsplash.com/photo-1556103330-d5ecf4770d3e?auto=format&fit=crop&q=80&w=400'),
    ]

    for name, price, desc, count, cat_name, img in products_data:
        category = Category.objects.get(name=cat_name)
        Product.objects.update_or_create(
            name=name,
            defaults={
                'price': price,
                'description': desc,
                'count': count,
                'category': category,
                'image_url': img
            }
        )
    
    print(f"Created {len(products_data)} products.")

if __name__ == '__main__':
    seed()
