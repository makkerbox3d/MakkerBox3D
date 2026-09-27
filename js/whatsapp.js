// whatsapp.js // Módulo de integração com WhatsApp

function enviarOrcamentoWhatsApp(idOrcamento){

    const orcamento =
    appData.orcamentos?.find(
        o => o.numero === idOrcamento
    );


    if(!orcamento){

        alert("Orçamento não encontrado.");

        return;

    }



    const cliente =
    appData.clientes?.find(
        c => c.nome === orcamento.cliente
    );



    if(!cliente || !cliente.telefone){

        alert(
            "Cliente sem telefone cadastrado."
        );

        return;

    }



    const mensagem = `Olá ${orcamento.cliente}! 👋

Segue seu orçamento de impressão 3D:

📌 Produto: ${orcamento.produto}

🧱 Material: ${orcamento.material}

⏱ Prazo: ${orcamento.prazo}

💰 Valor: ${formatarMoeda(orcamento.valor)}

📅 Validade: ${orcamento.validade}

Qualquer dúvida estou à disposição. Obrigado!`;

    const telefone =
    cliente.telefone
    .replace(/\D/g,'');



    const url =
    "https://wa.me/"
    + telefone
    + "?text="
    + encodeURIComponent(mensagem);



    window.open(
        url,
        "_blank"
    );

}

function enviarMensagemCliente(nome, telefone, texto){

    if(!telefone)return;



    const numero =
    telefone.replace(/\D/g,'');



    const url =
    "https://wa.me/"
    + numero
    + "?text="
    + encodeURIComponent(texto);



    window.open(
        url,
        "_blank"
    );

}
