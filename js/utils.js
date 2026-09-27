// utils.js // Funções auxiliares gerais do Sistema de Gestão de
Impressão 3D

function abrirModal(id) { const modal = document.getElementById(id);

    if (modal) {
        modal.classList.remove("hidden");
    }

}

function fecharModal(id) { const modal = document.getElementById(id);

    if (modal) {
        modal.classList.add("hidden");
    }

}

function formatarMoeda(valor) {

    return Number(valor || 0).toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}

function formatarNumero(valor, casas = 2) {

    return Number(valor || 0)
        .toFixed(casas);

}

function limparFormulario(idFormulario) {

    const form = document.getElementById(idFormulario);

    if (form) {
        form.reset();
    }

}

function criarImagemPreview(elemento, origem) {

    if (!elemento) return;

    elemento.innerHTML = `
        <img 
            src="${origem}" 
            class="w-full h-full object-cover rounded-xl"
            onerror="this.src='https://placehold.co/400x300?text=Imagem'"
        >
    `;

}

function confirmarAcao(mensagem) {

    return confirm(mensagem);

}

function atualizarIcones() {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}
