// app_V2.js // Inicialização principal do Sistema Gestão Impressão 3D
V2

document.addEventListener(“DOMContentLoaded”, () => {

    iniciarSistemaV2();

});

function iniciarSistemaV2(){

    inicializarFinanceiro();


    carregarEventosV2();


    renderEquipamentos();


    renderAlmoxarifado();


    renderVitrine();


    renderPedidos();


    renderClientes();


    renderFinanceiro();


    atualizarDashboard();


    atualizarIcones();

}

function carregarEventosV2(){

    const formCliente =
    document.getElementById("formCliente");


    if(formCliente){

        formCliente.addEventListener(
            "submit",
            salvarCliente
        );

    }



    const buscaVitrine =
    document.getElementById(
        "vitrineBuscaNome"
    );


    if(buscaVitrine){

        buscaVitrine.addEventListener(
            "input",
            renderVitrine
        );

    }



    const filtroVitrine =
    document.getElementById(
        "vitrineFiltroCategoria"
    );


    if(filtroVitrine){

        filtroVitrine.addEventListener(
            "change",
            renderVitrine
        );

    }

}

function switchTab(tabId,botao){

    document
    .querySelectorAll(".tab-content")
    .forEach(sec=>{

        sec.classList.add("hidden");

    });



    const destino =
    document.getElementById(
        "tab-"+tabId
    );


    if(destino){

        destino.classList.remove("hidden");

    }



    document
    .querySelectorAll(".tab-btn")
    .forEach(btn=>{

        btn.classList.remove(
            "active"
        );

    });



    if(botao){

        botao.classList.add(
            "active"
        );

    }



    if(tabId==="dashboard"){

        atualizarDashboard();

    }


    if(tabId==="financeiro"){

        renderFinanceiro();

    }


    if(tabId==="clientes"){

        renderClientes();

    }


    atualizarIcones();

}
