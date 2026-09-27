
// orcamento.js
// Módulo de geração de orçamentos


function criarOrcamento(){

    const cliente =
    document.getElementById("orcCliente").value;


    const produto =
    document.getElementById("orcProduto").value;


    const material =
    document.getElementById("orcMaterial").value;


    const prazo =
    document.getElementById("orcPrazo").value;


    const valor =
    Number(
        document.getElementById("orcValor").value
    );


    const orcamento = {

        numero:
        gerarId("orc"),

        cliente,

        produto,

        material,

        prazo,

        valor,

        validade:
        document.getElementById("orcValidade").value,

        data:
        new Date().toLocaleDateString("pt-BR")

    };


    if(!appData.orcamentos){

        appData.orcamentos=[];

    }


    appData.orcamentos.push(orcamento);


    salvarBanco();


    mostrarOrcamento(orcamento);

}





function mostrarOrcamento(orc){

    const area =
    document.getElementById("previewOrcamento");


    if(!area)return;



    area.innerHTML = `

    <div id="documentoOrcamento"
    class="bg-white text-black rounded-xl p-8">

        <h1 class="text-2xl font-bold">
        ORÇAMENTO DE IMPRESSÃO 3D
        </h1>


        <hr class="my-4">


        <p>
        Cliente:
        <strong>${orc.cliente}</strong>
        </p>


        <p>
        Produto:
        <strong>${orc.produto}</strong>
        </p>


        <p>
        Material:
        <strong>${orc.material}</strong>
        </p>


        <p>
        Prazo:
        <strong>${orc.prazo}</strong>
        </p>


        <h2 class="text-xl font-bold mt-5">
        Valor:
        ${formatarMoeda(orc.valor)}
        </h2>


        <p class="mt-4">
        Validade:
        ${orc.validade}
        </p>


    </div>

    `;

}





function imprimirOrcamento(){

    const conteudo =
    document.getElementById(
        "documentoOrcamento"
    );


    if(!conteudo){

        alert("Gere um orçamento primeiro.");

        return;

    }



    const janela =
    window.open("", "_blank");


    janela.document.write(`

    <html>

    <head>

    <title>Orçamento</title>

    <style>

    body{
        font-family:Arial;
        padding:40px;
    }

    </style>

    </head>


    <body>

    ${conteudo.innerHTML}

    </body>

    </html>

    `);


    janela.document.close();


    janela.print();

}
