from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ServiceType(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=2000)
    work_price = models.FloatField()
    type = models.ForeignKey(ServiceType, related_name='services', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField()

    def __str__(self):
        return self.user.get_username()


class Order(models.Model):
    date = models.DateField()
    client = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def full_price(self):
        serviceUnits = ServiceUnit.objects.filter(order=self)
        sum=0
        for i in serviceUnits:
            sum+= i.price
        return sum
    
class ServiceUnit(models.Model):
    master = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='order', on_delete=models.CASCADE)

    @property
    def price(self):
        return self.service.work_price
    
    def __str__(self):
        return str(self.master) + str(self.service)

class News(models.Model):
    text = models.TextField(max_length=2000)
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, related_name="news", on_delete=models.CASCADE)
    date = models.DateField()
    photo = models.ImageField(blank=True)

class Review(models.Model):
    text = models.TextField(max_length=2000)
    author = models.ForeignKey(User, related_name="reviews", on_delete=models.CASCADE)
    date = models.DateField()
    rate = models.IntegerField()
    order= models.OneToOneField(Order, related_name="reviews", on_delete=models.CASCADE)

class FAQ(models.Model):
    question=models.CharField(max_length=200)
    answer = models.CharField(max_length=1000)
    date = models.DateField()
