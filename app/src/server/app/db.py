class DB(object):
    def __init__(self):
        self.name = 'db'

    def migrations(self):
        migs = []
        migs.append({'name': 'local', 'version': 0})
        migs.append({'name': 'repo', 'version': 0})
        return migs
        # DB_PATH = os.environ.get("DB_PATH", "")
        # if type(DB_PATH) == str and len(DB_PATH) > 3:
        #     db_file = Path(DB_PATH)
        #     if not db_file.is_file():
        #         db_file.touch()
        #     engine = create_engine("sqlite://" + DB_PATH)
        #     # conn = engine.connect()
        # #     context = MigrationContext.configure(conn)
        # #     current_rev = context.get_current_revision()
