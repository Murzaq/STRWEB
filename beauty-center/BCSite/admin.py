from django.contrib import admin
from .models import Service, ServiceType, Doctor, Order, ServiceUnit, FAQ, News, Review

admin.site.register(ServiceType)
admin.site.register(Service)
admin.site.register(Doctor)
admin.site.register(Order)
admin.site.register(ServiceUnit)
admin.site.register(FAQ)
admin.site.register(News)
admin.site.register(Review)