from __future__ import print_function
from os import path
from pathlib import Path
from app.handlers.handler import Handler
from alembic.migration import MigrationContext
from sqlalchemy import create_engine
class Migrate(Handler):

    def __init__(self):
        super().__init__()
        self.name = "migrate"

    def migrate(self, app, name):
        return self.respond({'migration': {'name': name, 'version': 0}})
