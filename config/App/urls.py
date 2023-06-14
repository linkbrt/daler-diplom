from django.urls import path

from . import views

urlpatterns = [
    path('get-user-info/', views.get_user_info),
    path('set-user-image/', views.set_user_image),
    path('set-user-card/', views.set_user_card),
    path('get-items/', views.get_items),
    path('get-item-info/', views.get_item_info),
]