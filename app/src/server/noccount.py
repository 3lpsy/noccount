from __future__ import print_function
from app.app import App
from app.handlers.handlers import handlers
import sys
import atexit

app = App()

def main():
    app.boot()
    app.configure()
    handles = handlers()
    for name, handler in handlers().items():
        app.register(name, handler)

    try:
        app.start();
        sys.stdout.write('\n')
        sys.stdout.write("MSG_READY")
        sys.stdout.write('\n')
    except Exception as e:
        if type(e).__name__ == 'BindError':
            sys.stderr.write(type(e).__name__)
            sys.stderr.write('\n')
            sys.stderr.write("ERR_DUPLICATE")
            sys.stdout.write('\n')
        else:
            sys.stderr.write("ERR_FAILURE")
            sys.stderr.write('\n')
            raise e

def exit():
    app.halt()

atexit.register(exit)

if __name__ == '__main__':
    main()
