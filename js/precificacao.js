// precificacao.js // Módulo responsável pelos cálculos de custo e
formação de preço

function calcularPrecificacaoProcesso(){

    const tf = appData.tabelasFixas;


    const idImp =
    document.getElementById("procImpressora")?.value;


    const idMat =
    document.getElementById("procMateriaPrima")?.value;


    const consumo =
    Number(document.getElementById("procConsumoMat")?.value || 0);


    const perda =
    Number(document.getElementById("procPerdaPct")?.value || 0);



    const horasImp =
    Number(document.getElementById("procTempoImpHoras")?.value || 0);


    const minutosImp =
    Number(document.getElementById("procTempoImpMinutos")?.value || 0);


    const tempoImp =
    horasImp + (minutosImp / 60);



    const maoHoras =
    Number(document.getElementById("procTempoMaoHoras")?.value || 0);


    const maoMin =
    Number(document.getElementById("procTempoMaoMinutos")?.value || 0);


    const tempoMao =
    maoHoras + (maoMin / 60);



    let custoMaterial = 0;


    const material =
    appData.almoxarifado.find(
        m => m.id === idMat
    );


    if(material){

        const custoUnidade =
        material.preco /
        (material.qtdComprada || 1);


        custoMaterial =
        consumo *
        (1 + perda / 100) *
        custoUnidade;

    }



    let custoEnergia = 0;
    let depreciacao = 0;


    const impressora =
    appData.equipamentos.find(
        e => e.id === idImp
    );


    if(impressora){

        const consumoKwh =
        (impressora.consumoWatts *
        tempoImp) / 1000;


        custoEnergia =
        consumoKwh *
        tf.tarifaEnergia;


        depreciacao =
        (impressora.valorCompra /
        impressora.vidaUtilHoras) *
        tempoImp;

    }



    const maoObra =
    tf.custoMaoObraHora *
    tempoMao *
    (1 + tf.encargosSociais / 100);



    const custoBase =
    custoMaterial +
    custoEnergia +
    depreciacao +
    maoObra;



    const complexidade =
    document.getElementById("procComplexidade")?.value
    || "media";


    const adicional =
    (tf.complexidades[complexidade] || 20)
    / 100;



    const custoComComplexidade =
    custoBase +
    (custoBase * adicional);



    const custoComEmbalagem =
    custoComComplexidade +
    tf.custoEmbalagemEnvio;



    const taxas =
    tf.taxaImposto +
    tf.comissaoVenda +
    tf.taxaCartao +
    tf.taxaDevolucao +
    tf.taxaReinvestimento;



    const divisor =
    1 - (taxas / 100);



    const lucro =
    custoComEmbalagem *
    (tf.lucroLiquidoDesejado / 100);



    let preco = 0;


    if(divisor > 0){

        preco =
        (custoComEmbalagem + lucro)
        / divisor;

    }else{

        preco =
        custoComEmbalagem * 1.5;

    }



    atualizarResultado("detCustoMat", custoMaterial);
    atualizarResultado("detCustoEnergiaImp", custoEnergia);
    atualizarResultado("detCustoDepreciacaoImp", depreciacao);
    atualizarResultado("detCustoMaoObra", maoObra);

    atualizarResultado("resProcCustoTotal", custoComComplexidade);

    atualizarResultado("resProcPrecoFinalUnitario", preco);



    return {

        custoBase:
        custoComComplexidade,

        precoFinal:
        preco,

        lucroLiquido:
        lucro

    };

}

function atualizarResultado(id, valor){

    const elemento =
    document.getElementById(id);


    if(elemento){

        elemento.innerText =
        formatarMoeda(valor);

    }

}
