
// pedidos.js
// Módulo de gerenciamento de pedidos


function renderPedidos(){

    const corpo =
    document.getElementById("tabelaPedidosCorpo");

    if(!corpo) return;


    corpo.innerHTML = "";


    let faturamento = 0;
    let lucro = 0;


    appData.pedidos.forEach(pedido=>{

        faturamento += Number(pedido.valorTotal || 0);
        lucro += Number(pedido.lucroLiquidoTotal || 0);


        corpo.innerHTML += `

        <tr class="border-b border-slate-800">

            <td class="px-4 py-3 text-white">
                ${pedido.cliente}
            </td>

            <td class="px-4 py-3">
                ${pedido.produtoNome}
            </td>

            <td class="px-4 py-3">
                ${pedido.qtd}
            </td>

            <td class="px-4 py-3">
                ${formatarMoeda(pedido.valorTotal)}
            </td>

            <td class="px-4 py-3 text-emerald-400">
                ${formatarMoeda(pedido.lucroLiquidoTotal)}
            </td>

            <td class="px-4 py-3">

                <select
                onchange="alterarStatusPedido('${pedido.id}',this.value)"
                class="bg-slate-900 border border-slate-700 rounded p-2">

                    <option ${pedido.status==="Orçamento"?"selected":""}>
                    Orçamento
                    </option>

                    <option ${pedido.status==="Em Produção"?"selected":""}>
                    Em Produção
                    </option>

                    <option ${pedido.status==="Concluído"?"selected":""}>
                    Concluído
                    </option>

                    <option ${pedido.status==="Entregue"?"selected":""}>
                    Entregue
                    </option>

                </select>

            </td>

        </tr>

        `;

    });


    const fat =
    document.getElementById("totalFaturamento");

    const luc =
    document.getElementById("totalLucro");


    if(fat)
        fat.innerText = formatarMoeda(faturamento);


    if(luc)
        luc.innerText = formatarMoeda(lucro);


}





function criarPedido(pedido){

    pedido.id =
    pedido.id || gerarId("ped");


    appData.pedidos.push(pedido);


    salvarBanco();

    renderPedidos();

}





function alterarStatusPedido(id,status){

    const pedido =
    appData.pedidos.find(
        p=>p.id===id
    );


    if(!pedido)return;


    pedido.status=status;


    salvarBanco();

    renderPedidos();

}





function excluirPedido(id){


    if(!confirm("Excluir pedido?"))
    return;


    appData.pedidos =
    appData.pedidos.filter(
        p=>p.id!==id
    );


    salvarBanco();

    renderPedidos();

}
