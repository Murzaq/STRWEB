from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('login/', views.LoginView.as_view(), name='login'),
    path('sign-up/',views.SignUpView.as_view(),name="sign-up"),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('services/', views.ServicesView.as_view(), name='services'),
    path('news/', views.NewsView.as_view(), name='news'),
    path('FAQ/', views.FAQView.as_view(), name='FAQ'),
    path('contacts/', views.ContactsView.as_view(), name='contacts'),
    path('promo/', views.PromoView.as_view(), name='promo'),
    path('vacancy/', views.VacancyView.as_view(), name='vacancy'),
    path('privacy_policy/', views.PrivacyPolicyView.as_view(), name='privacy'),
    path('dashboard/', views.DashBoardsView.as_view(), name='dashboard'),
    path('css/', views.CssView.as_view(), name='css'),
    re_path(r'^order/(?P<sunits>[\|\w]+)/$', views.OrderView.as_view(), name='order'),
    re_path(r'^news/(?P<news_id>\d+)/$', views.ArticleView.as_view(), name='article'),   
          
]

