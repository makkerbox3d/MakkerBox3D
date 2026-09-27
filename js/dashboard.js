
// dashboard.js
// Dashboard geral do sistema de impressão 3D


function atualizarDashboard(){

    const pedidos =
    appData.pedidos || [];


    const financeiro =
    appData.financeiro || {
        entradas:[],
        saidas:[]
    };


    let vendas = 0;
    let lucro = 0;
    let custos = 0;



    pedidos.forEach(p=>{

        vendas += Number(p.valorTotal || 0);

        lucro += Number(
            p.lucroLiquidoTotal || 0
        );

    });



    financeiro.saidas.forEach(s=>{

        custos += Number(
            s.valor || 0
        );

    });



    const entradas =
    financeiro.entradas.reduce(
        (total,item)=>
        total + Number(item.valor || 0),
        0
    );



    const faturamento =
    vendas + entradas;



    const lucroReal =
    faturamento - custos;



    atualizarCampoDashboard(
        "dashboardFaturamento",
        formatarMoeda(faturamento)
    );


    atualizarCampoDashboard(
        "dashboardCustos",
        formatarMoeda(custos)
    );


    atualizarCampoDashboard(
        "dashboardLucro",
        formatarMoeda(lucroReal)
    );



    const margem =
    faturamento > 0
    ?
    ((lucroReal / faturamento)*100)
    :
    0;



    atualizarCampoDashboard(
        "dashboardMargem",
        margem.toFixed(1)+"%"
    );



    gerarRankingProdutos();

}





function atualizarCampoDashboard(id,valor){

    const elemento =
    document.getElementById(id);


    if(elemento){

        elemento.innerText = valor;

    }

}





function gerarRankingProdutos(){

    const lista =
    document.getElementById(
        "rankingProdutos"
    );


    if(!lista)return;



    const produtos = {};



    appData.pedidos.forEach(p=>{


        if(!produtos[p.produtoNome]){

            produtos[p.produtoNome]=0;

        }


        produtos[p.produtoNome]+=Number(
            p.qtd || 0
        );

    });



    const ranking =
    Object.entries(produtos)
    .sort(
        (a,b)=>b[1]-a[1]
    )
    .slice(0,5);



    lista.innerHTML="";



    ranking.forEach(item=>{


        lista.innerHTML += `

        <div class="flex justify-between border-b border-slate-800 py-3">

            <span>
            ${item[0]}
            </span>

            <span class="text-indigo-400">
            ${item[1]} vendidos
            </span>

        </div>

        `;

    });

}
