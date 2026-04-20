from django.urls import path
from .views import (
    categories_list,
    category_detail,
    CategoryProducts,
    ProductsList,
    ProductDetail,
    UserList,
    UserRegister,
    UserOrders,
    OrderDetail,
    CurrentUser,
)

urlpatterns = [
    path('categories/', categories_list),
    path('categories/<int:id>/', category_detail),
    path('categories/<int:id>/products/', CategoryProducts.as_view()),

    path('products/', ProductsList.as_view()),
    path('products/<int:id>/', ProductDetail.as_view()),

    path('users/', UserList.as_view()),
    path('registration/', UserRegister.as_view()),
    path('orders/', UserOrders.as_view()),
    path('orders/<int:id>/', OrderDetail.as_view()),
    path('me/', CurrentUser.as_view()),

]
