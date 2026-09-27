// equipamentos.js // Módulo de gerenciamento de equipamentos

function renderEquipamentos() {

    const gridImpressoras = document.getElementById("gridImpressoras");
    const gridExtras = document.getElementById("gridEquipamentosExtras");

    if (!gridImpressoras || !gridExtras) return;

    gridImpressoras.innerHTML = "";
    gridExtras.innerHTML = "";

    const impressoras = appData.equipamentos.filter(
        e => e.categoria === "Impressora 3D"
    );

    const extras = appData.equipamentos.filter(
        e => e.categoria === "Equipamento Extra"
    );


    impressoras.forEach(eq => {

        const custoHora =
            (eq.valorCompra / (eq.vidaUtilHoras || 1))
            .toFixed(2);


        gridImpressoras.innerHTML += `
        <div class="bg-slate-900 rounded-2xl p-5 border border-slate-800">

            <h3 class="text-lg font-bold text-white">
                ${eq.nome}
            </h3>

            <div class="text-sm text-slate-400 mt-3">

                <p>Compra:
                ${formatarMoeda(eq.valorCompra)}
                </p>

                <p>Vida útil:
                ${eq.vidaUtilHoras} horas
                </p>

                <p>Consumo:
                ${eq.consumoWatts}W
                </p>

                <p class="text-indigo-400 font-bold">
                Depreciação:
                R$ ${custoHora}/h
                </p>

            </div>

            <div class="flex gap-2 mt-4">

                <button
                onclick="editarEquipamento('${eq.id}')"
                class="bg-slate-800 px-3 py-2 rounded">
                Editar
                </button>

                <button
                onclick="deletarEquipamento('${eq.id}')"
                class="bg-red-900 px-3 py-2 rounded">
                Excluir
                </button>

            </div>

        </div>`;
    });


    extras.forEach(eq => {

        gridExtras.innerHTML += `
        <div class="bg-slate-900 rounded-2xl p-5 border border-slate-800">

            <h3 class="font-bold text-white">
            ${eq.nome}
            </h3>

            <p class="text-slate-400">
            ${formatarMoeda(eq.valorCompra)}
            </p>

        </div>`;
    });


    atualizarIcones();

}

function salvarEquipamento(event) {

    event.preventDefault();


    const id =
    document.getElementById("equipId").value;


    const equipamento = {

        id: id || gerarId("eq"),

        nome:
        document.getElementById("equipNome").value,

        categoria:
        document.getElementById("equipCategoria").value,

        valorCompra:
        Number(document.getElementById("equipValorCompra").value),

        vidaUtilHoras:
        Number(document.getElementById("equipVidaUtilHoras").value),

        consumoWatts:
        Number(document.getElementById("equipConsumoWatts").value)

    };


    if(id){

        const index =
        appData.equipamentos.findIndex(
            e => e.id === id
        );

        appData.equipamentos[index] = equipamento;

    }else{

        appData.equipamentos.push(equipamento);

    }


    salvarBanco();

    fecharModal("modalEquipamento");

    renderEquipamentos();

}

function editarEquipamento(id){

    const eq =
    appData.equipamentos.find(
        e => e.id === id
    );


    if(!eq)return;


    document.getElementById("equipId").value = eq.id;
    document.getElementById("equipNome").value = eq.nome;
    document.getElementById("equipCategoria").value = eq.categoria;
    document.getElementById("equipValorCompra").value = eq.valorCompra;
    document.getElementById("equipVidaUtilHoras").value = eq.vidaUtilHoras;
    document.getElementById("equipConsumoWatts").value = eq.consumoWatts;


    abrirModal("modalEquipamento");

}

function deletarEquipamento(id){

    if(!confirm("Excluir equipamento?"))
    return;


    appData.equipamentos =
    appData.equipamentos.filter(
        e => e.id !== id
    );


    salvarBanco();

    renderEquipamentos();

}
