<template>
  <div>
    <v-text-field v-model="texto" label="digite seu texto"> </v-text-field>
    <v-text-field v-model="aluno.nome"></v-text-field>
    <v-text-field v-model="aluno.idade"></v-text-field>
    <div> {{ texto }}</div>
    <div> {{ `Aluno: ${aluno.nome} idade: ${aluno.idade}` }} </div>
    {{ aluno }}
  </div>
</template>

<script setup>

import { ref } from 'vue';
const texto = ref('')

const aluno = ref({
  nome: 'João',
  idade: 20
})


</script>