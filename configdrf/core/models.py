from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(null=False, blank=False, unique=True, verbose_name="Email")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}"
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class Category(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, verbose_name="Name")

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False, verbose_name="Name")
    price = models.IntegerField(null=False, blank=False, verbose_name="Price")
    description = models.TextField(max_length=500, null=False, blank=False, verbose_name="Description")
    count = models.IntegerField(null=False, blank=False, verbose_name="Count")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"
    
    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.product.name
    
    class Meta:
        verbose_name = "Order item"
        verbose_name_plural = "Order items"
    

