from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade
from rest_framework import serializers


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nome', 'tipo', 'email', 'termometro']


class EstagioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estagio
        fields = ['id', 'nome']


class OrganizacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacao
        fields = ['id', 'nome', 'erp']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome']


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome']


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['descricao', 'estagio', 'cliente', 'org', 'produto']


class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ['descricao', 'tipo', 'duracao', 'ticket']
