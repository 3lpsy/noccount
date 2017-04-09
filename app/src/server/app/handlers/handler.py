import json

class Handler(object):
    def call(self, func, app, *args):
        print('calling...' + func)
        meth = getattr(self, func)
        data = []
        if len(args) == 0:
            return meth(app)
        elif len(args) == 1:
            return meth(app, args[0])
        else:
            for k,arg in args:
                print(k)
                data.append(json.loads(arg))
        return meth(app, *data)

    def respond(self, data):
        return json.dumps({'data': data})
