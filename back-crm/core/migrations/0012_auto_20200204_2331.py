# Generated by Django 3.0.3 on 2020-02-05 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_ticket'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='produto',
            field=models.ManyToManyField(null=True, to='core.Produto'),
        ),
    ]
