from __future__ import print_function
from app.handlers.handler import Handler

class Hello(Handler):
    def __init__(self):
        super().__init__()
        self.name = "hello"

    def hello(self, app):
        return 'world'
