from .models import Cliente, Estagio, Organizacao, Produto, Ticket, Vendedor, Atividade, Erp, Ramo
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user


class RamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ramo
        fields = '__all__'
        depth = 1



class ErpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Erp
        fields = '__all__'
        depth = 1

class AtividadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        # cliente = ClienteSerializer(many=False, read_only=True)
        fields = '__all__'
        depth = 1



class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        atividade = AtividadeSerializer(many=False, read_only=True)
        fields = '__all__'
        depth = 1


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
        depth = 1


class EstagioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estagio
        tickets = TicketSerializer(many=False, read_only=True)
        fields = ['id', 'nome', 'tickets']
        depth = 1


class OrganizacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizacao
        fields = ['id', 'razaosocial', 'nomefantasia', 'rua',
                  'bairro', 'cidade', 'uf', 'erpe', 'ramo', 'telefone' ,  'contatos']
        depth = 1


class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = ['id', 'nome', 'codigo', 'modalidade']


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ['id', 'nome']



