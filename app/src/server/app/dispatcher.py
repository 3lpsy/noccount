class Dispatcher(object):
    def __init__(self):
        self.name = 'dispatcher'

    def register(self, app, func, handler):
        def handle(*args):
            return handler.call(func, app, *args)
        setattr(self, func, handle)
