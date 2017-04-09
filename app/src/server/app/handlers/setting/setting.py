from __future__ import print_function
from os import path
from pathlib import Path
from app.handlers.handler import Handler

class Setting(Handler):
    def __init__(self):
        super().__init__()
        self.name = "setting"

    def load_env(self, app, path):
        env_file = Path(path)
        if env_file.is_file():
            app.config.load_env(path)
            return True;
        else:
            env_file.touch()
            app.config.load_env(path)
            return True;

    def set_env(self, app, key, value):
        env_file = Path(app.config.path)
        if env_file.is_file():
            try:
                app.config.set_env(key, value)
                return True
            except Exception as e:
                print(e)
                return False
        else:
            try:
                return True
            except Exception as e:
                return False
