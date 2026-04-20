from rest_framework import serializers
from .models import User, Order, OrderItem, Product, Category

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'role', 'shop_name', 'shop_address', 'latitude', 'longitude')

    def validate_role(self, value):
        # Aggressively strip any quotes or whitespace
        clean_value = value.replace('"', '').replace("'", "").strip().lower()
        return clean_value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email already exists")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    price = serializers.IntegerField()
    description = serializers.CharField(max_length=500)
    count = serializers.IntegerField()
    image_url = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    owner = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        # The view should inject the owner
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.description = validated_data.get('description', instance.description)
        instance.count = validated_data.get('count', instance.count)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.category_id = validated_data.get('category', instance.category_id)
        instance.save()
        return instance
    
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product']

class OrderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    items = OrderItemSerializer(many=True)

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        request = self.context.get('request')
        user = request.user
        order = Order.objects.create(user=user, **validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
            
        return order
