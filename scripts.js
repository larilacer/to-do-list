const input = document.querySelector('.recebe-tarefas');
const button = document.querySelector('.b-add-tarefa');
const listaCompleta = document.querySelector('.lista-tarefas');

let MinhaListadetarefas = [];
let editando = false;
let tarefaEditada = null;

function AdiconarnovaTarefa() {
    if (input.value.trim() === '') {
        alert('A tarefa não pode ser vazia!');
        return;
    }

    // Se estiver editando uma tarefa
    if (editando && tarefaEditada !== null) {
        MinhaListadetarefas[tarefaEditada].tarefa = input.value.trim();
        editando = false;
        tarefaEditada = null;

        // Voltar o texto do botão para "Adicionar"
        button.textContent = 'Adicionar';
    } else {
        MinhaListadetarefas.push({
            tarefa: input.value.trim(),
            concluida: false
        });
    }

    input.value = ''; // Limpa o campo de input após adicionar ou editar
    MostrarTarefas();
}

function MostrarTarefas() {
    let NovaLinha = '';

    MinhaListadetarefas.forEach((item, posicao) => {
        NovaLinha += `
         <li class="tarefas ${item.concluida ? 'done' : ''}">
            <img src="./imagens/check-box_12503570.png" alt="tarefa-concluída" onclick="ConcluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./imagens/dumpster_10243772.png" alt="Remover tarefa" onclick="deletarTarefa(${posicao})">
            <img src="./imagens/icons8-pencil-100.png" alt="Editar tarefa" onclick="EditarTarefa(${posicao})">
        </li>
        `;
    });

    listaCompleta.innerHTML = NovaLinha;
    localStorage.setItem('lista-ordenada', JSON.stringify(MinhaListadetarefas));
}

function ConcluirTarefa(posicao) {
    MinhaListadetarefas[posicao].concluida = !MinhaListadetarefas[posicao].concluida;
    MostrarTarefas();
}

function deletarTarefa(posicao) {
    // Bloqueia a exclusão durante a edição
    if (editando) {
        alert('Não é possível deletar enquanto uma tarefa está sendo editada.');
        return;
    }

    MinhaListadetarefas.splice(posicao, 1);
    MostrarTarefas();
}

function EditarTarefa(posicao) {
    editando = true;
    tarefaEditada = posicao;
    input.value = MinhaListadetarefas[posicao].tarefa;
    input.focus();

    // Alterar o texto do botão para "Salvar"
    button.textContent = 'Salvar';
}

function RecarregaTarefas() {
    const tarefasdoLocalstorage = localStorage.getItem('lista-ordenada');
    
    if (tarefasdoLocalstorage) {
        MinhaListadetarefas = JSON.parse(tarefasdoLocalstorage);
    }

    MostrarTarefas();
}

RecarregaTarefas();
button.addEventListener('click', AdiconarnovaTarefa);