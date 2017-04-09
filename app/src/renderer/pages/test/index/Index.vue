<template>
    <div>
        <app-container>
            <div class="container">
                <section class="section has-text-centered">
                    <p>Input something like <code>1 + 1</code>.</p>
                    <p>This calculator supports <code>+-*/^()</code>,
                        whitespaces, and integers and floating numbers.</p>
                    <br>
                    <input id="formula" v-model="formula"></input>
                    <br>
                    <button type="button" class="button" @click="calc">Calc</button>
                    <br>
                    <div id="result">
                        Result: {{result}}
                    </div>
                </section>
            </div>
        </app-container>
    </div>
</template>

<script>
import AppContainer from 'common/components/layout/Container';
import api from 'api';

export default {
    name: 'home-index',
    data() {
        return {
            formula: '1 + 1',
            result: ''

        }
    },
    methods: {
        calc() {
            api.call('calc', this.formula).then((response) => {
                if (response && response.data) {
                    let data = response.data;
                    this.result = data.result;
                }
            })
        }
    },
    components: {
        AppContainer
    }
}
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
