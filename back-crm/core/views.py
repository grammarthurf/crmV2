
from rest_framework import viewsets
from .serializers import ClienteSerializer, EstagioSerializer, OrganizacaoSerializer, ProdutoSerializer, TicketSerializer, VendedorSerializer, AtividadeSerializer, UserSerializer
from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade
from django.core import serializers
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ClienteViewSet(viewsets.ModelViewSet):

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class EstagioViewSet(viewsets.ModelViewSet):

    queryset = Estagio.objects.all()
    serializer_class = EstagioSerializer


class OrganizacaoViewSet(viewsets.ModelViewSet):

    queryset = Organizacao.objects.all()
    serializer_class = OrganizacaoSerializer


class ProdutoViewSet(viewsets.ModelViewSet):

    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class TicketViewSet(viewsets.ModelViewSet):

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class VendedorViewSet(viewsets.ModelViewSet):

    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer


class AtividadeViewSet(viewsets.ModelViewSet):

    queryset = Atividade.objects.all()
    serializer_class = AtividadeSerializer
