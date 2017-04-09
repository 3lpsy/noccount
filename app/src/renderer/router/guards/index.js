const perform = (guards, from, to, lastNext, i) => {
    let guard = guards[i]
    if (guards.length === i + 1) {
        guard(from, to, lastNext)
    } else {
        guard(from, to, function (nextArg) {
            switch (typeof (nextArg)) {
            case 'undefined':
                perform(guards, from, to, lastNext, i + 1)
                break
            case 'object':
                lastNext(nextArg)
                break
            case 'boolean':
                lastNext(nextArg)
                break
            case 'string':
                lastNext(nextArg)
                break
            }
        })
    }
}


const check = (guards) => {
    if (! guards || guards.length < 1) {
        return function (from, to, next) {
            next();
        }
    }
    return function (from, to, next) {
        perform(guards, from, to, next, 0)
    }
}

export {check}
