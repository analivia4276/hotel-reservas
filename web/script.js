const url = "http://localhost:3000";

const quartos = [];
const reservas = [];
let quartoAtual = null;
let reservaAtual = null;

const listaQuartos = document.getElementById("listaQuartos");
const listaReservas = document.getElementById("listaReservas");

const cadastroQuarto = document.getElementById("cadastroQuarto");
const formQuarto = document.getElementById("formQuarto");
const numeroQuarto = document.getElementById("numeroQuarto");
const tipoQuarto = document.getElementById("tipoQuarto");
const modalExcluirQuarto = document.getElementById("modalExcluirQuarto");

const cadastroReserva = document.getElementById("cadastroReserva");
const formReserva = document.getElementById("formReserva");
const quartoReserva = document.getElementById("quartoReserva");
const hospedeReserva = document.getElementById("hospedeReserva");
const entradaReserva = document.getElementById("entradaReserva");
const saidaReserva = document.getElementById("saidaReserva");
const modalExcluirReserva = document.getElementById("modalExcluirReserva");

if (listaQuartos) carregarQuartos();
if (listaReservas) carregarReservas();

function carregarQuartos() {
    fetch(url + "/quartos/listar")
    .then(res => res.json())
    .then(data => {
        quartos.length = 0;
        quartos.push(...data);
        listarQuartos();
    })
    .catch(() => alert("Problemas com a conexão da API"));
}

function listarQuartos() {
    listaQuartos.innerHTML = "";

    quartos.forEach(quarto => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${quarto.numero}</td>
            <td>${quarto.tipo}</td>
            <td class="acoes">
                <button class="btn" onclick="abrirExclusaoQuarto(${quarto.id})">Excluir</button>
            </td>
        `;
        listaQuartos.appendChild(linha);
    });
}

function abrirCadastroQuarto() {
    cadastroQuarto.classList.remove("oculto");
}

function fecharCadastroQuarto() {
    cadastroQuarto.classList.add("oculto");
    formQuarto.reset();
}

if (formQuarto) {
    formQuarto.addEventListener("submit", function(e) {
        e.preventDefault();

        const novoQuarto = {
            numero: numeroQuarto.value,
            tipo: tipoQuarto.value
        };

        fetch(url + "/quartos/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoQuarto)
        })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Erro ao cadastrar quarto");
            }
            alert("Quarto cadastrado com sucesso!");
            fecharCadastroQuarto();
            carregarQuartos();
        })
        .catch(err => alert(err.message || "Erro ao cadastrar quarto"));
    });
}

function abrirExclusaoQuarto(id) {
    quartoAtual = id;
    modalExcluirQuarto.classList.remove("oculto");
}

function fecharModalExcluirQuarto() {
    quartoAtual = null;
    modalExcluirQuarto.classList.add("oculto");
}

function confirmarExclusaoQuarto() {
    fetch(url + "/quartos/excluir/" + quartoAtual, {
        method: "DELETE"
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || "Erro ao excluir quarto");
        }
        alert("Quarto excluído com sucesso!");
        fecharModalExcluirQuarto();
        carregarQuartos();
    })
    .catch(err => alert(err.message || "Erro ao excluir quarto"));
}

function carregarReservas() {
    fetch(url + "/reservas/listar")
    .then(res => res.json())
    .then(data => {
        reservas.length = 0;
        reservas.push(...data);
        listarReservas();
    })
    .catch(() => alert("Problemas com a conexão da API"));

    fetch(url + "/quartos/listar")
    .then(res => res.json())
    .then(data => {
        quartos.length = 0;
        quartos.push(...data);
        listarQuartosNoSelect();
    })
    .catch(() => alert("Problemas com a conexão da API"));
}

function listarReservas() {
    listaReservas.innerHTML = "";

    reservas.forEach(reserva => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${reserva.quarto.numero} - ${reserva.quarto.tipo}</td>
            <td>${reserva.hospede}</td>
            <td>${new Date(reserva.data_entrada).toLocaleDateString("pt-BR")}</td>
            <td>${new Date(reserva.data_saida).toLocaleDateString("pt-BR")}</td>
            <td class="acoes">
                <button class="btn" onclick="abrirExclusaoReserva(${reserva.id})">Excluir</button>
            </td>
        `;
        listaReservas.appendChild(linha);
    });
}

function listarQuartosNoSelect() {
    quartoReserva.innerHTML = '<option value="">Selecione o quarto</option>';

    quartos.forEach(quarto => {
        const opcao = document.createElement("option");
        opcao.value = quarto.id;
        opcao.innerHTML = quarto.numero + " - " + quarto.tipo;
        quartoReserva.appendChild(opcao);
    });
}

function abrirCadastroReserva() {
    cadastroReserva.classList.remove("oculto");
}

function fecharCadastroReserva() {
    cadastroReserva.classList.add("oculto");
    formReserva.reset();
}

if (formReserva) {
    formReserva.addEventListener("submit", function(e) {
        e.preventDefault();

        const novaReserva = {
            quartoId: quartoReserva.value,
            hospede: hospedeReserva.value,
            data_entrada: entradaReserva.value,
            data_saida: saidaReserva.value
        };

        fetch(url + "/reservas/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaReserva)
        })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Erro ao cadastrar reserva");
            }
            alert("Reserva cadastrada com sucesso!");
            fecharCadastroReserva();
            carregarReservas();
        })
        .catch(err => alert(err.message || "Erro ao cadastrar reserva"));
    });
}

function abrirExclusaoReserva(id) {
    reservaAtual = id;
    modalExcluirReserva.classList.remove("oculto");
}

function fecharModalExcluirReserva() {
    reservaAtual = null;
    modalExcluirReserva.classList.add("oculto");
}

function confirmarExclusaoReserva() {
    fetch(url + "/reservas/excluir/" + reservaAtual, {
        method: "DELETE"
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || "Erro ao excluir reserva");
        }
        alert("Reserva excluída com sucesso!");
        fecharModalExcluirReserva();
        carregarReservas();
    })
    .catch(err => alert(err.message || "Erro ao excluir reserva"));
}
