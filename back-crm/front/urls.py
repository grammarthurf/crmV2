from django.urls import include, path
from rest_framework import routers
from core.views import ClienteViewSet
from django.contrib import admin

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
