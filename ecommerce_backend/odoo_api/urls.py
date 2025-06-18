from django.urls import path
from . import views

urlpatterns = [
    path('connect/', views.connect_to_odoo, name='connect_to_odoo'),
    path('products/', views.get_products, name='get_products'),
]
