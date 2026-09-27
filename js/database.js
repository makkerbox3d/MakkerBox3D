
// database.js V2
// Banco de dados local expandido do Sistema de Gestão de Impressão 3D


const defaultData = {

    tabelasFixas: {

        taxaDevolucao: 2.5,
        taxaImposto: 6,
        custoEmbalagemEnvio: 5,
        comissaoVenda: 12,
        lucroLiquidoDesejado: 25,
        horasTrabalhadasMes: 160,
        taxaCartao: 3.5,
        encargosSociais: 15,
        taxaReinvestimento: 5,
        tarifaEnergia: 0.85,
        custoMaoObraHora: 25,

        complexidades: {

            baixa: 10,
            media: 20,
            alta: 40,
            ultra: 50

        }

    },


    equipamentos: [],


    almoxarifado: [],


    vitrine: [],


    pedidos: [],


    clientes: [],


    financeiro: {

        entradas: [],

        saidas: []

    },


    orcamentos: [],


    manutencoes: []

};



let appData = carregarBanco();



function carregarBanco(){

    const dados =
    localStorage.getItem(
        "appImpressao3D_Data"
    );


    if(dados){

        try{

            const convertido =
            JSON.parse(dados);


            return {

                ...defaultData,

                ...convertido,


                financeiro:{

                    ...defaultData.financeiro,

                    ...(convertido.financeiro || {})

                }

            };


        }catch(e){

            console.error(
                "Erro ao carregar banco",
                e
            );

        }

    }


    return JSON.parse(
        JSON.stringify(defaultData)
    );

}





function salvarBanco(){

    localStorage.setItem(

        "appImpressao3D_Data",

        JSON.stringify(appData)

    );

}





function gerarId(prefixo){

    return prefixo +
    "_" +
    Date.now() +
    "_" +
    Math.floor(
        Math.random()*1000
    );

}





function restaurarBancoPadrao(){

    if(
        confirm(
            "Restaurar todos os dados?"
        )
    ){

        appData =
        JSON.parse(
            JSON.stringify(defaultData)
        );


        salvarBanco();


        location.reload();

    }

}
