import { app } from 'electron'
import ps from 'child_process';
import find from 'find-process';
import commandExists from 'command-exists';

const zerorpc = require("zerorpc");

export default class Daemon{

    constructor() {
        this.proc = {};
    }

    run() {
        console.log('running daemon...')
        console.log('current proc: ', this.proc)

        return new Promise((resolve, reject) => {
            let child = ps.spawn('python3', [this.path(), this.port()]);

            let pid = child.pid;

            child.stdout.on('data', (data) => {
                if (data.toString().includes('MSG_READY')) {
                    console.log('server stdout: handled');
                    console.log('MSG_READY');
                    this.resolveProc(pid).then((proc) => {
                        resolve(this.proc);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    })
                } else {
                    console.log('server stdout: info');
                    console.log(data.toString())
                }
            });

            child.stderr.on('data', (data) => {
                if (data.toString().includes('ERR_DUPLICATE')) {
                    console.error('server stderr: handled');
                    console.error("ERR_DUPLICATE");
                    this.resolveProc().then((proc) => {
                        console.log("current proc after resolve", this.proc);
                        resolve(this.proc);
                    }).catch((error) => {
                        console.log(error);
                        reject(error);
                    });
                } else if (data.toString().includes("ERR_FAILURE")) {
                    console.error('server stderr: handled');
                    console.error("ERR_FAILURE");
                    reject(new Error("ERR_FAILURE"));
                } else {
                    console.error('server stderr: info');
                    console.error(data.toString());
                }

            });
        })
    }

    resolveProc(pid = null) {
        console.log("resolve proc" )
        return new Promise((resolve, reject) => {
            if (this.proc && this.proc.pid) {
                console.log("proc exists" )
                resolve(this.proc);
            } else {
                console.log('need to find proc')
                this.findProc(pid).then((proc) => {
                    console.log("found proc");
                    console.log(proc);
                    this.proc = proc;
                    resolve(this.proc);
                })
            }

        });
    }

    findProc(pid = null) {
        console.log('finding proc');
        return new Promise((resolve, reject) => {
            if (pid && pid > 0) {
                console.log('find by pid ' + pid);
                find('pid', pid).then((procs) => {
                    console.log(procs);
                    resolve(procs[0]);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            } else {
                console.log('find by name');
                find('name', process.env.DAEMON_MAIN).then((procs) => {
                    console.log('procs found', procs)
                    if (procs.length > 0) {
                        resolve(procs[0])
                    } else {
                        reject(new Error("No procs by name"));

                    }
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                })
            }
        })
    }

    hasPython3() {
        return new Promise((resolve, reject) => {
            commandExists('python3').then(function(command){
                console.log("command python3 exists")
                resolve(true);
            }).catch(function(){
                console.error("command python3 does not exists")
                resolve(false);
            });
        })
    }


    path() {
        return process.env.DAEMON_PATH + '/' + process.env.DAEMON_MAIN;
    }

    port() {
        return process.env.DAEMON_PATH;
    }


    exit() {
        this.kill()
        this.proc = null
    }

    kill() {
        this.proc.kill()
    }
}
