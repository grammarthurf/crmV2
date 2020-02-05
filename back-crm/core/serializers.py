from .models import Cliente, Estagio, Organizacao, Produto, Ticket
from rest_framework import serializers


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['nome', 'tipo', 'email', 'termometro']


class EstagioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estagio
        fields = ['nome']


class OrganizacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacao
        fields = ['nome', 'erp']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['nome']


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['descricao', 'estagio', 'cliente', 'org', 'produto']
