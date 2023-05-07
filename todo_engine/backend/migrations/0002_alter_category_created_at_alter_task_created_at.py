# Generated by Django 4.2.1 on 2023-05-04 18:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]