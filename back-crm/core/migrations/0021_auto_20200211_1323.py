# Generated by Django 3.0.3 on 2020-02-11 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0020_auto_20200211_0914'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizacao',
            name='cep',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='tipo',
            field=models.CharField(max_length=1, null=True),
        ),
    ]