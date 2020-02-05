
from rest_framework import viewsets
from .serializers import ClienteSerializer, EstagioSerializer, OrganizacaoSerializer, ProdutoSerializer, TicketSerializer
from .models import Cliente, Estagio, Organizacao, Produto, Ticket
from django.core import serializers


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
