from django.db import models
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from front import settings
from django.contrib.auth.models import User


# Create your models here.

class Vendedor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=155, null=True, blank=True)
    isAdmin = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return str(self.user) + str(self.nome)

@receiver(post_save, sender=User)
def create_user_vendedor(sender, instance, created, **kwargs):
    if created:
        try:
            print(sender.username, instance, created )
        except:
            pass
        Vendedor.objects.create(user=instance)
        Token.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_vendedor(sender, instance, **kwargs):
    instance.vendedor.save()

class Created (models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.datetime) + str(self.user.username)
class Updated (models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    desc = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Ramo(models.Model):
    desc = models.CharField( default='Semnome' ,max_length=65, blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.desc)

class Erp(models.Model):
    codigo = models.CharField(max_length=64, null=True, blank=True)
    desc = models.CharField(max_length=65, null=True, blank=True)
    empresa = models.CharField(max_length=65, null=True, blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated )

    def __str__(self):
        return str(self.desc)




class Estagio (models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return str(self.nome)


class Cliente(models.Model):
    nome = models.CharField(max_length=100, null=True, blank=True)
    cargo = models.CharField(max_length=1, null=True, blank=True)
    tel = models.CharField(max_length=15, null=True, blank=True)
    cel = models.CharField(max_length=15, null=True, blank=True)
    dep = models.CharField(max_length=100, null=True, blank=True)
    birth = models.CharField(max_length=55, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    skype = models.CharField(max_length=65, null=True, blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.nome) if self.nome else ' '




class Organizacao (models.Model):
    codigo = models.CharField(max_length=255, null=True, blank=True)
    razaosocial = models.CharField(max_length=100, null=True, blank=True)
    nomefantasia = models.CharField(max_length=100, blank=True, null=True)
    cnpj = models.CharField(max_length=15, null=True, blank=True)
    ramo = models.ForeignKey(Ramo, related_name='orgs', null=True, on_delete=models.CASCADE, blank=True)
    ie = models.CharField(max_length=55, null=True, blank=True)
    site= models.CharField(max_length=155, null=True, blank=True)
    email = models.EmailField(blank=True, null=True)
    telefone = models.CharField(max_length=64, null=True, blank=True)
    rua = models.CharField(max_length=100, blank=True, null=True)
    complemento = models.CharField(max_length=155, null=True, blank=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cep = models.CharField(max_length=64, null=True, blank=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    uf = models.CharField(max_length=100, blank=True, null=True)
    erpe = models.ForeignKey(Erp, related_name='orgs', blank=True, null=True ,on_delete=models.CASCADE)
    contatos = models.ManyToManyField(Cliente, related_name='orgs',blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE, null=True, blank=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.razaosocial)



class Produto (models.Model):
    nome = models.CharField(max_length=255)
    modalidade = models.CharField(max_length=155, null=True, blank=True)
    codigo = models.CharField(max_length=255, blank=True, null=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.nome)


class VendedorExt(models.Model):
    nome = models.CharField(max_length=155)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.nome)

class Obs(models.Model):
    texto = models.CharField(max_length=255, null=True)
    data = models.DateField(auto_now_add=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.data)


class Ticket (models.Model):
    titulo = models.CharField(max_length=100, blank=True)
    estagio = models.ForeignKey(
        Estagio, related_name='tickets', on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)
    produto = models.ManyToManyField(Produto)
    valorestimado = models.IntegerField(null=True)
    termometro = models.CharField(max_length=100, null=True, blank=True)
    vendedor = models.ForeignKey(
        Vendedor,  on_delete=models.CASCADE, null=True)
    vendedorext = models.ManyToManyField(VendedorExt, related_name='leads', blank=True)
    obs = models.ManyToManyField(Obs, related_name='tickets')
    status = models.CharField(max_length=155, blank=True, default='Aberto')
    mtvperd = models.CharField(max_length=155, null=True, blank=True)
    cmtperd = models.CharField(max_length=155, null=True, blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)


    def __str__(self):
        return str(self.titulo)



class Atividade (models.Model):
    assunto = models.CharField(max_length=255, null=True)
    dataini = models.CharField(max_length=64 , null=True)
    horaini = models.CharField(max_length=64 , null=True)
    datafim = models.CharField(max_length=64 , null=True)
    horafim = models.CharField(max_length=64 , null=True)
    tipo = models.CharField(max_length=64)
    ticket = models.ForeignKey(Ticket, related_name='atividades', on_delete=models.CASCADE, null=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, null=True)
    org = models.ForeignKey(Organizacao, on_delete=models.CASCADE, null=True)
    feito = models.BooleanField(null=True, blank=True)
    created = models.ForeignKey(Created, on_delete=models.CASCADE , null=True)
    updated = models.ManyToManyField(Updated)

    def __str__(self):
        return str(self.assunto)


