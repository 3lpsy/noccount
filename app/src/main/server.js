import path from 'path';
import ps from 'child_process';

const serveDir = './../../../server';
const serveMain = 'api.py';

export default {
    proc: null,
    port: 4242,
    path: () => {
        return path.join(__dirname, serveDir, serveMain);
    },
    create: function() {
        console.log(this.path());
        this.proc = ps.spawn('python3', [this.path(), this.port]);
        if (this.proc != null) {
            console.log('child process success')
        }
    },
    exit: function() {
        this.kill()
        this.proc = null
        this.port = null
    },
    kill: function() {
        this.proc.kill()
    }
}
