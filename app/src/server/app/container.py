class Container(object):
    def __init__(self):
        self.booted = False
        self.registered = False
        self.config = None
        self.rpc = None

    def boot(self):
        self.booted = True

    def halt(self):
        print('HALT')
        self.rpc.halt()
