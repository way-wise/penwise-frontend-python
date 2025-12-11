from django.contrib import admin
from django.urls import path
from core.views import render_page
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', render_page, {'page_name': 'index'}, name='index'),
    path('<str:page_name>/', render_page, name='page'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'static')
