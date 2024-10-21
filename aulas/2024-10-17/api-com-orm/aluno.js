import conexao from "./db.js"
import { Sequelize } from 'sequelize';
const Aluno = conexao.define('alunos', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula:{
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
}, {
    paranoid: true
})

export { Aluno }