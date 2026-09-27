// vitrine.js // Módulo de gerenciamento da vitrine de produtos

function renderVitrine(){

    const grid =
    document.getElementById("gridVitrine");


    if(!grid) return;


    grid.innerHTML = "";


    const busca =
    (
        document.getElementById("vitrineBuscaNome")?.value
        || ""
    ).toLowerCase();


    const filtro =
    document.getElementById("vitrineFiltroCategoria")?.value
    || "todas";



    const produtos =
    appData.vitrine.filter(prod=>{


        const nome =
        prod.nome.toLowerCase()
        .includes(busca);


        const categoria =
        filtro === "todas"
        ||
        prod.categoria === filtro;


        return nome && categoria;

    });



    if(produtos.length === 0){

        grid.innerHTML = `
        <div class="col-span-full text-center text-slate-400 p-8">
            Nenhum produto encontrado.
        </div>`;

        return;

    }



    produtos.forEach(prod=>{


        const estoque =
        prod.estoque || 0;



        grid.innerHTML += `

        <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

            <img
            src="${prod.foto}"
            class="w-full h-44 object-cover"
            onerror="this.src='https://placehold.co/400x300'"
            >


            <div class="p-5">

                <span class="text-xs text-indigo-400">
                ${prod.categoria}
                </span>


                <h3 class="font-bold text-white text-lg mt-2">
                ${prod.nome}
                </h3>


                <p class="text-slate-400 mt-2">
                Custo:
                ${formatarMoeda(prod.custoBase)}
                </p>


                <p class="text-emerald-400 font-bold">
                Lucro:
                ${formatarMoeda(prod.lucroLiquido)}
                </p>


                <p class="text-white mt-2">
                Venda:
                ${formatarMoeda(prod.precoFinal)}
                </p>



                <div class="flex items-center gap-3 mt-4">

                    <button
                    onclick="alterarEstoqueVitrine('${prod.id}',-1)"
                    class="bg-slate-800 px-3 py-1 rounded">
                    -
                    </button>


                    <span>
                    ${estoque} un
                    </span>


                    <button
                    onclick="alterarEstoqueVitrine('${prod.id}',1)"
                    class="bg-slate-800 px-3 py-1 rounded">
                    +
                    </button>

                </div>


                <button
                onclick="abrirModalPedidoRapido('${prod.id}')"
                class="w-full mt-4 bg-indigo-600 py-2 rounded-xl">
                Gerar Pedido
                </button>


            </div>

        </div>`;

    });


    atualizarIcones();

}

function alterarEstoqueVitrine(id,delta){

    const produto =
    appData.vitrine.find(
        p=>p.id===id
    );


    if(!produto)return;


    produto.estoque =
    Math.max(
        0,
        (produto.estoque || 0)+delta
    );


    salvarBanco();

    renderVitrine();

}

function salvarProdutoVitrine(produto){

    produto.id =
    produto.id || gerarId("vit");


    appData.vitrine.push(produto);


    salvarBanco();


    renderVitrine();

}

function deletarVitrine(id){

    if(!confirm("Excluir produto da vitrine?"))
    return;


    appData.vitrine =
    appData.vitrine.filter(
        p=>p.id!==id
    );


    salvarBanco();


    renderVitrine();

}
