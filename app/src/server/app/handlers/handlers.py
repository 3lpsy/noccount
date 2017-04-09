from app.handlers.calc.calc import Calc
from app.handlers.setting.setting import Setting
from app.handlers.hello.hello import Hello
from app.handlers.boot.boot import Boot
from app.handlers.migrate.migrate import Migrate

def handlers():
    return {
        'calc': Calc(),
        'load_env': Setting(),
        'set_env': Setting(),
        'hello': Hello(),
        'boot': Boot(),
        'migrate': Migrate()

    }
