from __future__ import print_function
from app.handlers.calc.calculate import calculate
from app.handlers.handler import Handler

class Calc(Handler):
    def __init__(self):
        super().__init__()
        self.name = "calc"

    def calc(self, app, text):
        """based on the input text, return the int result"""
        try:
            result = calculate(text)
            return self.respond({"result": result})
        except Exception as e:
            return 0.0

    def add(self, app, int1, int2):
        """based on the input text, return the int result"""
        try:
            return int(int1) + int(int2)
        except Exception as e:
            return 0.0
