from __future__ import print_function
from app.handlers.handler import Handler
from app.handlers.setting.setting import Setting
from pathlib import Path
import json

class Boot(Handler):
    def __init__(self):
        super().__init__()
        self.name = "boot"

    def boot(self, app, data):
        try:
            self.boot_env(app, data)
            self.boot_mig(data)
            return self.respond(self.data(app))
        except Exception as e:
            print(type(e).__name__)
            raise e

    def data(self, app):
        data = {}
        data["status"] = app.status()
        data["pid"] = app.pid()
        data["migrations"] = app.db.migrations()

        return data

    def boot_env(self, app, data):
        env = data["env"]
        setting = Setting()
        app.config.load_env(env["ENV_PATH"])
        for key, value in env.items():
            setting.set_env(app, key, value)

    def boot_mig(self, data):
        is_compiled = data["env"]["DAEMON_COMPILED"]

        alembic_local_path = data["env"]["DAEMON_ALEMBIC_LOCAL_PATH"]
        db_local_path = data["env"]["DB_LOCAL_FILE"]
        db_local_file = Path(db_local_path)

        if not db_local_file.is_file():
            db_local_file.touch()

        search = "sqlalchemy.url = "

        lines = []

        open(alembic_local_path + '/alembic.ini', 'w').close()

        local_template_file = Path(alembic_local_path + '/alembic.py.mako')
        alembic_local_file = Path(alembic_local_path + '/alembic.ini')

        with local_template_file.open('r+', encoding="UTF-8") as fin:
            with alembic_local_file.open('a', encoding="UTF-8") as fout:
                for line in fin:
                    if search in line:
                        rep = "sqlalchemy.url = sqlite:///" + db_local_path
                        fout.write(rep)
                    elif "sourceless =" in line:
                        print('sourceless')
                        rep = line
                        fout.write(rep)
                    else:
                        fout.write(line)


        alembic_repo_path = data["env"]["DAEMON_ALEMBIC_REPO_PATH"]
        db_repo_path = data["env"]["DB_REPO_FILE"]
        db_repo_file = Path(db_repo_path)

        if not db_repo_file.is_file():
            db_repo_file.touch()

        search = "sqlalchemy.url = "

        lines = []

        open(alembic_repo_path + '/alembic.ini', 'w').close()

        repo_template_file = Path(alembic_repo_path + '/alembic.py.mako')
        alembic_repo_file = Path(alembic_repo_path + '/alembic.ini')

        with repo_template_file.open('r+', encoding="UTF-8") as fin:
            with alembic_repo_file.open('a', encoding="UTF-8") as fout:
                for line in fin:
                    if search in line:
                        rep = "sqlalchemy.url = sqlite:///" + db_repo_path
                        fout.write(rep)
                    elif "sourceless =" in line:
                        print('sourceless')
                        rep = line
                        fout.write(rep)
                    else:
                        fout.write(line)
