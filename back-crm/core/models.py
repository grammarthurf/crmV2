from django.db import models

# Create your models here.


class Cliente (models.Model):
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=5)
    fone = models.CharField(max_length=15)
    celular = models.CharField(max_length=15)
    email = models.CharField(max_length=100)
    skype = models.CharField(max_length=65)
    termometro = models.CharField(max_length=15)

    def __str__(self):
        return self.nome
