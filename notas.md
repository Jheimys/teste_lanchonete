```js
// model
/**
 * enumerate de estado de pedido
 * não é obrigatório usar, mas pode facilitar com erros
 * de inconsistência
 */
const statusPedido = Object.freeze = {
    PENDENTE: 0,
    EM_PREPARO: 1,
    EM_ENTREGA: 2,
    ENTREGUE: 3,
    CANCELADO: 4
}

/**
 * Schema do modelo para o MongoDB
 *
 * Corrigir:
 * - referências das coleções 'estrangeiras' (Produto e Cliente)
 * - garantir import de tipo 'ObjectId'
 * - consolidar nome de campos
 */

pedidoSchema = {
    pedidos: [
        {
            // qtd: Number
            produtoId: { type: ObjectId, ref: 'Pedidos'},
            qtd: {type: Number, min: 0, default: 0},
            produtoNome: { type: String },
            produtoPreco: { type: Number }
        }
    ],
    nome: { type: ObjectId, ref: 'Clientes'},
    nomeCliente: { type: String },
    data: { type: Date },
    status: { type: Number, enum: [0,1,2,3,4], default: 0},
    preco: { type: Number }
}


// controller
// criar pedido
/**
 * @Body do POST
 * {
 *  pedidos: [
 *      {
 *          produtoId: ObjectId("Produto"),
 *          qtd: 10
 *      }
 *  ],
 *  email: email@mail.com,
 * }
 */
router.post("/pedidos", async (req, res, next) => {
    const body = req.body;

    let price = 0;
    let produtos = []
    for (const pedido of body.pedidos) {
        // confirmar consulta a collection de Produtos
        // nome está correto?
        // objeto de pesquisa está correto, devo procurar com { nome: produtoId}?
        // pesquisar com findOne? Ou com find? findById?
        const produto = await Produto.find({nome: pedido.produtoId})
        if (produto.length > 0) {
            // declaro obj para novo produto
            const newProdPedido = {
                produtoId: produto[0]._id,
                qtd: pedido.qtd,
                produtoNome: produto[0].nome,
                produtoPreco: produto[0].preco,
            }

            // atualizo o preco do pedido
            // verificacoes: tem qtd > 0? produtoPreco é != undefined ou é Number?
            price += newProdPedido.produtoPreco * newProdPedido.qtd;

            // adiciono novo produto do pedido no array de produtos
            produtos.push(newProdPedido);
            // produtos = [...produtos, newProdPedido] // método alternativo de adicionar outro elem no array
        }
    }

    // verificação de não tiver nenhum produto no pedido
    // retorna erro 400 (requisição mal formatada) para postman / frontend
    if (produtos.length == 0) return res.status(400).send({err: 'Não tem produtos no pedido'});

    // findOne retorna 1 objeto
    const cliente = await Cliente.findOne({email: body.email})

    // se nao tiver cliente não tem pedido.
    // retorna erro 400 (requisição mal formatada) para postman / frontend
    if (!cliente) return res.status(400).send({err: 'Cliente não cadastrado'});

    // instancia nova data para atribuir ao novo pedido
    const currentDate = new Date()

    // define o status do pedido inicial => PENDENTE (0 enumerado)
    const status = statusPedido.PENDENTE;

    // define obj com informações necessárias para o novo pedido do cliente
    const newPedidoObj = {
        pedidos: produtos,
        nomeCliente: cliente.nome,
        nome: cliente._id,
        data: currentDate,
        status: status,
        preco: price
    }

    // try-catch para criar novo pedido e registrar no banco
    try {
        // confirmar consulta a collection de Produtos
        // nome está correto?
        const newPedido = await Pedido.create(newPedidoObj);
        // em caso de sucesso retorno para o postman/frontend objeto do novo pedido
        // preciso retornar tudo? Ou só alguns campos?
        return res.status(201).send(newPedido);
    } catch(err) {
        // em caso de erro, retorna erro 500 para o postman/frontend
        // investiga…
```
