from django.contrib import admin
from .models import User, Order, OrderItem, Category, Product

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "password")
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order",)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ['name']
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "description", "count",)
    search_fields = ['name']

admin.site.register(User, UserAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)