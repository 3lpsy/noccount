from dotenv import load_dotenv, set_key as set_env_key
import os

class Config(object):
    def __init__(self):
        self.path = ''

    def configure(self):
        ENV_PATH = os.environ.get("ENV_PATH", "")
        if type(ENV_PATH) == str and len(ENV_PATH) > 3:
            self.load_env(ENV_PATH)

    def load_env(self, path):
        self.path = path
        load_dotenv(self.path)

    def set_env(self, key, value):
        set_env_key(self.path, key, value);
        load_dotenv(self.path)
