import client from './client'


export default {
    calc: (formula) => {
        console.log('calc');
        console.log(formula);
        return new Promise((resolve,reject) => {
            client.invoke('calc', formula, (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        })
    }
}
