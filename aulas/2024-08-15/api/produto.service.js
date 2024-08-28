export function cadastrarProduto(produto){
    gravarNoBancoDeDados(produto);
    return produto;
}