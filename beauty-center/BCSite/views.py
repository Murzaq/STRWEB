import requests
from django.shortcuts import render, redirect
from .forms import LoginForm, SignUpForm
from .models import Doctor, News, Review, FAQ, Service, ServiceType, ServiceUnit, Order
from django.views import View
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db.models import Count
import datetime
import logging
import plotly.express as px
import re
logging.basicConfig(level=logging.INFO, filename='info.log',filemode='w',format="%(asctime)s| %(message)s")
logging.basicConfig(level=logging.ERROR, filename='error.log',filemode='w',format="%(asctime)s| %(message)s")

class IndexView(View):
    def get(self, req, *args, **kwargs):

        news = (News.objects.all().order_by('date')[::-1])[:1]
        reviews = (Review.objects.all().order_by('date')[::-1])[:3]

        return render(req,'service/index.html',{'news':news,'reviews':reviews})

class LoginView(View):
    form_class = LoginForm

    def post(self,req,*args,**kwargs):
        form = self.form_class(data = req.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(req, username=username,password=password)
            logging.info("user {username} try to authenticate".format(username=username))

            if user is not None:
                logging.info('user {0} authenticate'.format(username))
                login(req, user)

                return redirect('/')
            else:
                logging.error('user {0} authentication error'.format(username))
                return render(req,'registration/login.html',{"form":form, "error":['Wrong username or password']})

    def get(self, req, *args, **kwargs):
        form = self.form_class()
        return render(req,'registration/login.html',{"form":form})


class SignUpView(View):
    form_class = SignUpForm

    def post(self,req,*args,**kwargs):
        form = self.form_class(data = req.POST)
        logout(req)
        if form.is_valid():
            
            user = User.objects.create_user(username=form.cleaned_data["username"],
                                            email=form.cleaned_data["email"],
                                            password=form.cleaned_data["password"])
            logging.info('user {0} created'.format(user.username))
            login(req,user)
            return redirect('/')
        else:
            logging.error('user {0} authentication error'.format(user.username))            
            return render(req,'registration/sign_up.html',{"form":form,"error":form.errors.values})


    def get(self, req, *args, **kwargs):
        form = self.form_class()
        return render(req,'registration/sign_up.html',{"form":form})

class ProfileView(View):

    def post(self, req, *args, **kwargs):
        Review.objects.create(text = req.POST.get('review'), author = req.user, date = datetime.date.today(), rate = req.POST.get('rate'), order = Order.objects.get(id=req.POST.get('orderid')))
        
        return redirect('/profile')

    def get(self, req, *args, **kwargs):
        if req.user.is_anonymous:
            return redirect('/login')
        
        if len(Doctor.objects.filter(user = req.user))!=0:
            sunits = ServiceUnit.objects.filter(master = Doctor.objects.get(user = req.user))
            return render(req,'service/profile.html',{'profile':'e','sunits':sunits})
        
        orders = Order.objects.filter(client = req.user)
        pairs = []
        for i in orders:
            pairs.append([i, Review.objects.get(order=i) if len(Review.objects.filter(order=i))!=0 else None ])

        return render(req,'service/profile.html',{'op':pairs})
    
class ServicesView(View):
    def post(self, req, *args, **kwargs):
        return redirect('/order/'+req.POST.get('sunits'))

    def get(self, req, *args, **kwargs):
        services = Service.objects.filter(work_price__gte=float(req.GET.get('pfrom','0')) if req.GET.get('pfrom')!='' else 0,
                                          work_price__lte=float(req.GET.get('pto','1000')) if req.GET.get('pto')!='' else 1000)
        service_types = ServiceType.objects.all()

        if(len(req.GET)>2):
            type_filter=[]
            for type in service_types:
                if(req.GET.get(str(type)+'checkbox')):
                    type_filter.append(type)

            services = services.filter(type__in=type_filter).distinct()

            return render(req,'service/services.html',{"types":service_types,"services":services})

        return render(req,'service/services.html',{"types":service_types,"services":services})

class OrderView(View):
    def post(self, req, *args, sunits, **kwargs):
        order_list = []
        
        for i in re.findall('\|?[0-9]+',sunits):
            order_list.append(Service.objects.get(id=re.findall('([\d]+)',i)[0]))


        order = Order.objects.create(date =  req.POST.get('date'), client = req.user)
    
        for i in order_list:
            ServiceUnit.objects.create(master = Doctor.objects.first(), service = i, order = order)

        return redirect('/profile')

    def get(self, req, *args, sunits, **kwargs):

        if req.user.is_anonymous:
            return redirect('/login')

        order_list = []

        fullprice = 0
        for i in re.findall('\|?[0-9]+',sunits):
            order_list.append(Service.objects.get(id=re.findall('([\d]+)',i)[0]))



        for order in order_list:
            fullprice+=order.work_price

        print(order_list)

        return render(req, 'service/order.html',{"list":order_list,'amount':len(order_list),'tprice':fullprice})

class NewsView(View):
    def get(self,req,*args,**kwargs):
        news = News.objects.all().order_by('date')[::-1]
        return render(req,'service/news.html',{'news':news})

class ArticleView(View):
    def get(self,req,*args,**kwargs):
        article = News.objects.get(id=kwargs['news_id'])
        return render(req,'service/article.html',{'article':article})

class AboutView(View):
    def get(self,req,*args,**kwargs):
        return render(req,'service/about.html',{})
    
class FAQView(View):
    def get(self, req, *args, **kwargs):
        faq = FAQ.objects.all().order_by('date')[::-1]
        return render(req, 'service/faq.html',{'faq':faq})
    
class ContactsView(View):
    def get(self, req, *args, **kwargs):
        contacts = Doctor.objects.all()
        return render(req, 'service/contacts.html',{"contacts":contacts})
    
class VacancyView(View):
    def get(self, req, *args, **kwargs):
        return render(req, 'service/vacancy.html',{})
    
class PrivacyPolicyView(View):
    def get(self, req, *args, **kwargs):
        return render(req, 'service/privacy.html',{})

class PromoView(View):
    def get(self, req, *args, **kwargs):
        return render(req, 'service/promo.html',{})
    
class DashBoardsView(View):
    def get(self, req, *args, **kwargs):
        if(not User.objects.get(id=req.user.id).is_superuser):
            return redirect('/')
        
        detail_ServiceUnit = {}

        orders = Order.objects.all()

        service_ServiceUnit = {}
        service = Service.objects.all()

        for i in service:
            service_ServiceUnit[str(i)]=len(ServiceUnit.objects.filter(service=i))

        mg = 0
        for i in orders:
            mg+=i.full_price

        ts = px.bar(
            x=service_ServiceUnit.keys(),
            y=service_ServiceUnit.values(),
            title="Order per service",
            labels={'x':'Orders','y':'Amount'}
        )

        return render(req, 'service/dash.html',{'ts':ts.to_html(),'mg':mg})
