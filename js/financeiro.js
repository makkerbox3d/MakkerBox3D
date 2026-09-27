
// financeiro.js
// Módulo financeiro - entradas, saídas e fluxo de caixa


function inicializarFinanceiro(){

    if(!appData.financeiro){

        appData.financeiro = {

            entradas:[],
            saidas:[]

        };

        salvarBanco();

    }

}




function renderFinanceiro(){

    inicializarFinanceiro();


    const tabelaEntradas =
    document.getElementById("tabelaEntradas");


    const tabelaSaidas =
    document.getElementById("tabelaSaidas");



    if(tabelaEntradas){

        tabelaEntradas.innerHTML="";


        appData.financeiro.entradas
        .forEach(item=>{

            tabelaEntradas.innerHTML += `

            <tr class="border-b border-slate-800">

                <td class="px-4 py-3">
                ${item.descricao}
                </td>

                <td class="px-4 py-3 text-emerald-400">
                ${formatarMoeda(item.valor)}
                </td>

                <td class="px-4 py-3">
                ${item.data}
                </td>

            </tr>

            `;

        });

    }



    if(tabelaSaidas){

        tabelaSaidas.innerHTML="";


        appData.financeiro.saidas
        .forEach(item=>{

            tabelaSaidas.innerHTML += `

            <tr class="border-b border-slate-800">

                <td class="px-4 py-3">
                ${item.descricao}
                </td>

                <td class="px-4 py-3 text-red-400">
                ${formatarMoeda(item.valor)}
                </td>

                <td class="px-4 py-3">
                ${item.data}
                </td>

            </tr>

            `;

        });

    }


    calcularResumoFinanceiro();

}




function salvarMovimentoFinanceiro(tipo){

    const descricao =
    document.getElementById("movDescricao").value;


    const valor =
    Number(
        document.getElementById("movValor").value
    );



    const movimento = {

        id: gerarId("fin"),

        descricao: descricao,

        valor: valor,

        categoria:
        document.getElementById("movCategoria").value,

        data:
        new Date().toLocaleDateString("pt-BR")

    };



    if(tipo==="entrada"){

        appData.financeiro.entradas
        .push(movimento);

    }else{

        appData.financeiro.saidas
        .push(movimento);

    }


    salvarBanco();

    renderFinanceiro();

}





function calcularResumoFinanceiro(){

    inicializarFinanceiro();


    const entradas =
    appData.financeiro.entradas
    .reduce(
        (total,item)=>
        total + Number(item.valor || 0),
        0
    );



    const saidas =
    appData.financeiro.saidas
    .reduce(
        (total,item)=>
        total + Number(item.valor || 0),
        0
    );



    const saldo =
    entradas - saidas;



    const el =
    document.getElementById("saldoFinanceiro");


    if(el){

        el.innerText =
        formatarMoeda(saldo);

    }


    return {

        entradas,
        saidas,
        saldo

    };

}
