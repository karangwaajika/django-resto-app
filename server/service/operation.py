from product.models import *
from rest_framework.response import Response


class BeverageOperation:
    def __init__(self, beverage, openQty, soldQty):
        self.beverage = beverage
        self.openQty = openQty
        self.soldQty = soldQty

    def update_beverage_stock(self):
        beverage_stock = BeverageStock.objects.get(beverage=self.beverage)
        beverage_stock.qty = self.openQty - self.soldQty
        beverage_stock.save()
        return "Stock updated"
