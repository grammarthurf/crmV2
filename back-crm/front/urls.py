from django.urls import include, path
from rest_framework import routers
from core.views import ClienteViewSet, EstagioViewSet, OrganizacaoViewSet, ProdutoViewSet, TicketViewSet, VendedorViewSet, AtividadeViewSet, UserViewSet, RamoViewSet, ErpViewSet, VendedorExtViewSet
from django.contrib import admin
from rest_framework.authtoken import views


router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'estagio', EstagioViewSet)
router.register(r'orgs', OrganizacaoViewSet)
router.register(r'produto', ProdutoViewSet)
router.register(r'ticket', TicketViewSet)
router.register(r'vendedor', VendedorViewSet)
router.register(r'atividade', AtividadeViewSet)
router.register(r'vendext', VendedorExtViewSet)
router.register(r'erp', ErpViewSet)
router.register(r'ramo', RamoViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', include('authapp.urls')),
    path('api-token-auth/', views.obtain_auth_token)
]
