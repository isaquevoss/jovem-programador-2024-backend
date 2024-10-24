<template>
    <div>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3"  v-for="aluno in alunos">
            <v-card>
              <v-card-title> {{ aluno.nome }} </v-card-title>
              <v-card-text> {{ aluno.idade }} </v-card-text>
              <v-card-actions>
                <v-btn @click="editar(aluno)">Editar</v-btn>
                <v-btn @click="excluir(aluno)">Excluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

    </div>

</template>
<script setup>
import { ref } from 'vue';

const alunos = ref([
    {nome: 'João', idade: 20},
    {nome: 'Maria', idade: 22},
    {nome: 'José', idade: 21},
    {nome: 'Ana', idade: 23},
    {nome: 'Pedro', idade: 24},
    {nome: 'Paula', idade: 25},
    {nome: 'Carlos', idade: 26},
    {nome: 'Marta', idade: 27},
    {nome: 'Lucas', idade: 28},
    {nome: 'Luciana', idade: 29},
    {nome: 'Ricardo', idade: 30},
])

function editar(aluno) {
    alert(`Editar ${aluno.nome}`)
}

function excluir(aluno) {
    alert(`Excluir ${aluno.nome}`)
}
</script>