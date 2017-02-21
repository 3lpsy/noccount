<template>
  <div>
    <h1>Hello Calculator!</h1>
    <p>Input something like <code>1 + 1</code>.</p>
    <p>This calculator supports <code>+-*/^()</code>,
    whitespaces, and integers and floating numbers.</p>
    <input id="formula" v-model="formula" ></input>
    <button type="button" @click="calc" name="button">Calc</button>
    <div id="result">Result: {{result}}</div>
  </div>
</template>

<script>
import api from "./../../../api";
  export default {
    name: 'home-index',
    data() {
        return {
            formula: '1 + 1',
            result: 'None'
        }
    },
    methods: {
        calc() {
            api.calc(this.formula).then((result) => {
                console.log(result);
                this.result = result;
            }).catch((error) => {
                throw error;
            });
        }
    }
  }
</script>

<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>
