async function service() {
    let i = 0;
    var texto = '';
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 50));
        texto = texto + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        console.log('Serviço rodando...', i++);
    }
}

service();