from __future__ import print_function
from app.container import Container
from app.config import Config
from app.rpc import Rpc
from app.db import DB
from app.dispatcher import Dispatcher
from alembic.migration import MigrationContext
from sqlalchemy import create_engine
from pathlib import Path
import os

class App(Container):
    def __init__(self):
        super().__init__()
        self.name = 'noccount'
        self.dispatcher = Dispatcher()
        self.config = Config()
        self.db = DB()

    def configure(self):
        self.config.configure()

    def register(self, func, handler):
        self.dispatcher.register(self, func, handler)

    def start(self):
        self.rpc = Rpc()
        self.rpc.start(self.dispatcher)

    def status(self):
        stat = {}
        stat["isConfigured"] = self.is_configured()
        stat["isInstalled"] = self.is_installed()
        stat["isMigrated"] = self.is_migrated()
        stat["isRunning"] = self.is_running()
        stat["isBooted"] = self.is_booted()
        return stat


    def pid(self):
        return os.getpid()

    def is_migrated(self):
        return False

    def is_configured(self):
        return True

    def is_installed(self):
        return False

    def is_running(self):
        return True

    def is_booted(self):
        return True
