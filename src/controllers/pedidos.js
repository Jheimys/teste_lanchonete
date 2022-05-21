const PedidosModel = require('../models/pedidos')

async function get(req, res){
 
    const {id} = req.params

    const obj = id ? {_id: id} : null

    const pedidos = await PedidosModel.find(obj)

    res.send(pedidos)
}



//recebendo dados via post
async function post(req,res){

     const {pedidos, nome, nomeCliente, data, status, preco} = req.body

     let price = 0
     let produtos = []

     for (const pedido of body.pedidos) {
        // confirmar consulta a collection de Produtos
        // nome está correto?
        // objeto de pesquisa está correto, devo procurar com { nome: produtoId}?
        // pesquisar com findOne? Ou com find? findById?
        const produto = await produto.find({nome: pedido.produtoId})
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
    
    
    const etapa = statusPedido.pendente;

     const newPedidoObj = {

        pedidos: produtos,
         nomeCliente: cliente.nome,
         nome: cliente._id,
         data: currentDate,
         status: status,
         preco: price
    }

    // try{
    //  const newPedido = await Pedido.create(newPedidoObj);
    //  return res.status(201).send(newPedido);
    // } catch(err)
    
    
    pedido.save()
    res.send({
        message: 'success'
    })
}

module.exports = {
    get,
    post,
}

