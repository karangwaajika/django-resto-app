# Generated by Django 5.0.7 on 2024-08-15 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_alter_meal_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='meal_type',
            field=models.CharField(choices=[('Salad', 'Salad'), ('Soup', 'Soup'), ('Fried', 'Fried'), ('Stewed_Dish', 'Stewed Dish'), ('BBQ', 'BBQ'), ('Burger', 'Burger'), ('Hot_Dog', 'Hot Dog'), ('Pizza', 'Pizza'), ('Loaded_Fries', 'Loaded Fries'), ('Wrap', 'Wrap'), ('Side', 'Side'), ('Family_Deal', 'Family Deal'), ('Snack', 'Snack')], max_length=50),
        ),
    ]
