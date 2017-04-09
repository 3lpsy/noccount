import sys
import zerorpc
from exceptions.bind_error import BindError

class Rpc(object):
    def __init__(self):
        super().__init__()
        self.protocol = "tcp://"
        self.host = "127.0.0.1"
        self.port = "4242"
        self.server = None

    def start(self, app):
        print('Server start')
        self.server = zerorpc.Server(app, 'main')
        self.bind()
        print('Server running on {}'.format(self.address()))
        self.server.run()

    def bind(self):
        try:
            self.server.bind(self.address())
        except Exception as e:
            raise BindError

    def address(self):
        return self.protocol + self.host + ':' + self.port

    def boot(self):
        print('Server boot')

    def halt(self):
        print('Server halt')
        self.server.close()
