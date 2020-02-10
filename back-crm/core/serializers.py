from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['id', 'nome', 'tipo', 'fone',
                  'celular', 'email', 'skype', 'org']


class EstagioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estagio
        fields = ['id', 'nome', 'tickets']


class OrganizacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacao
        fields = ['id', 'razaosocial', 'nomefantasia', 'rua',
                  'bairro', 'cidade', 'uf', 'erp', 'clientes']


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'modalidade']


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome']


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['id', 'titulo', 'estagio',
                  'cliente', 'org', 'produto', 'valorestimado', 'termometro', 'vendedor', 'obs']


class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ['id', 'assunto', 'tipo', 'data', 'ticket', 'cliente', 'org']
