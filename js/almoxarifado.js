// almoxarifado.js // Módulo de controle de matéria-prima e insumos

function renderAlmoxarifado() {

    const gridMaterias =
        document.getElementById("gridMateriasPrimas");

    const gridExtras =
        document.getElementById("gridInsumosExtras");


    if (!gridMaterias || !gridExtras) return;


    gridMaterias.innerHTML = "";
    gridExtras.innerHTML = "";


    const materias =
        appData.almoxarifado.filter(
            item => item.tipo === "MateriaPrima"
        );


    const extras =
        appData.almoxarifado.filter(
            item => item.tipo === "Extra"
        );



    materias.forEach(mat => {

        const custo =
        mat.preco / (mat.qtdComprada || 1);


        gridMaterias.innerHTML += `

        <div class="bg-slate-900 rounded-2xl p-5 border border-slate-800">

            <h3 class="font-bold text-white">
                ${mat.nome}
            </h3>

            <p class="text-slate-400 mt-2">
                Compra:
                ${formatarMoeda(mat.preco)}
            </p>

            <p class="text-slate-400">
                Estoque:
                ${mat.estoque}${mat.unidade}
            </p>

            <p class="text-emerald-400 font-bold">
                Custo:
                ${formatarMoeda(custo)}/${mat.unidade}
            </p>


            <div class="flex gap-2 mt-4">

                <button
                onclick="editarInsumo('${mat.id}')"
                class="bg-slate-800 px-3 py-2 rounded">
                Editar
                </button>


                <button
                onclick="deletarInsumo('${mat.id}')"
                class="bg-red-900 px-3 py-2 rounded">
                Excluir
                </button>

            </div>

        </div>`;

    });



    extras.forEach(ins => {


        gridExtras.innerHTML += `

        <div class="bg-slate-900 rounded-2xl p-5 border border-slate-800">

            <h3 class="font-bold text-white">
                ${ins.nome}
            </h3>

            <p class="text-slate-400">
                Estoque:
                ${ins.estoque}${ins.unidade}
            </p>


            <button
            onclick="editarInsumo('${ins.id}')"
            class="bg-slate-800 px-3 py-2 rounded mt-3">
            Editar
            </button>


        </div>`;

    });


    atualizarIcones();

}

function salvarInsumo(event){

    event.preventDefault();


    const id =
    document.getElementById("insumoId").value;



    const item = {

        id:
        id || gerarId("alm"),


        nome:
        document.getElementById("insumoNome").value,


        tipo:
        document.getElementById("insumoTipo").value,


        preco:
        Number(document.getElementById("insumoPreco").value),


        qtdComprada:
        Number(document.getElementById("insumoQtdComprada").value),


        unidade:
        document.getElementById("insumoUnidade").value,


        estoque:
        Number(document.getElementById("insumoEstoque").value)

    };



    if(id){

        const index =
        appData.almoxarifado.findIndex(
            i => i.id === id
        );

        appData.almoxarifado[index] = item;


    }else{


        appData.almoxarifado.push(item);

    }



    salvarBanco();

    fecharModal("modalInsumo");

    renderAlmoxarifado();

}

function editarInsumo(id){

    const item =
    appData.almoxarifado.find(
        i => i.id === id
    );


    if(!item)return;


    document.getElementById("insumoId").value=item.id;
    document.getElementById("insumoNome").value=item.nome;
    document.getElementById("insumoTipo").value=item.tipo;
    document.getElementById("insumoPreco").value=item.preco;
    document.getElementById("insumoQtdComprada").value=item.qtdComprada;
    document.getElementById("insumoUnidade").value=item.unidade;
    document.getElementById("insumoEstoque").value=item.estoque;


    abrirModal("modalInsumo");

}

function deletarInsumo(id){

    if(!confirm("Excluir este item?"))
    return;


    appData.almoxarifado =
    appData.almoxarifado.filter(
        i => i.id !== id
    );


    salvarBanco();

    renderAlmoxarifado();

}
