// clientes.js // Módulo de gerenciamento de clientes

function renderClientes(){

    const tabela =
    document.getElementById("tabelaClientes");


    if(!tabela) return;


    tabela.innerHTML = "";


    const clientes =
    appData.clientes || [];



    clientes.forEach(cliente=>{


        const pedidos =
        appData.pedidos.filter(
            p => p.clienteId === cliente.id
        );



        const total =
        pedidos.reduce(
            (soma,p)=>
            soma + Number(p.valorTotal || 0),
            0
        );



        tabela.innerHTML += `

        <tr class="border-b border-slate-800">

            <td class="px-4 py-3 text-white">
                ${cliente.nome}
            </td>

            <td class="px-4 py-3">
                ${cliente.telefone || "-"}
            </td>

            <td class="px-4 py-3">
                ${cliente.cidade || "-"}
            </td>

            <td class="px-4 py-3 text-emerald-400">
                ${formatarMoeda(total)}
            </td>


            <td class="px-4 py-3">

                <button
                onclick="editarCliente('${cliente.id}')"
                class="bg-slate-800 px-3 py-2 rounded">

                Editar

                </button>

            </td>

        </tr>

        `;


    });

}

function salvarCliente(event){

    event.preventDefault();


    const id =
    document.getElementById("clienteId").value;



    const cliente = {

        id:
        id || gerarId("cli"),


        nome:
        document.getElementById("clienteNome").value,


        telefone:
        document.getElementById("clienteTelefone").value,


        cidade:
        document.getElementById("clienteCidade").value,


        observacoes:
        document.getElementById("clienteObservacoes").value,


        dataCadastro:
        new Date().toISOString()

    };



    if(!appData.clientes){

        appData.clientes=[];

    }



    if(id){

        const index =
        appData.clientes.findIndex(
            c=>c.id===id
        );


        appData.clientes[index]=cliente;


    }else{


        appData.clientes.push(cliente);


    }



    salvarBanco();


    fecharModal("modalCliente");


    renderClientes();

}

function editarCliente(id){

    const cliente =
    appData.clientes.find(
        c=>c.id===id
    );


    if(!cliente)return;


    document.getElementById("clienteId").value =
    cliente.id;


    document.getElementById("clienteNome").value =
    cliente.nome;


    document.getElementById("clienteTelefone").value =
    cliente.telefone || "";


    document.getElementById("clienteCidade").value =
    cliente.cidade || "";


    document.getElementById("clienteObservacoes").value =
    cliente.observacoes || "";


    abrirModal("modalCliente");

}

function buscarCliente(termo){

    termo =
    termo.toLowerCase();



    return (appData.clientes || [])
    .filter(cliente=>{

        return cliente.nome
        .toLowerCase()
        .includes(termo)
        ||
        (cliente.telefone || "")
        .includes(termo);

    });

}
