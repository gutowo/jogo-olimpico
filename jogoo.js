// Inicializa o estado do jogo
let vida = 100;
let inventario = [];
let jogoAcabado = false;
let checkpoint;

// Função para ajustar a vida
function ajustarVida(valor) {
    vida += valor;
    alert(`Sua vida agora é ${vida}`);
    if (vida <= 0) {
        alert("Você perdeu todas as suas forças e não conseguiu chegar aos Jogos Olímpicos.");
        jogoAcabado = true;
    }
}

// Função para adicionar itens ao inventário
function adicionarInventario(item) {
    inventario.push(item);
    alert(`${item} foi adicionado ao seu inventário.`);
    mostrarInventario();
}

// Função para mostrar o inventário
function mostrarInventario() {
    alert("Seu inventário contém: " + inventario.join(", "));
}

// Função para verificar se o inventário contém um item específico
function temItem(item) {
    return inventario.includes(item);
}

// Função para salvar o checkpoint
function salvarCheckpoint() {
    checkpoint = {
        vida: vida,
        inventario: [...inventario]
    };
    alert("Progresso salvo.");
}

// Função para carregar o checkpoint
function carregarCheckpoint() {
    if (checkpoint) {
        vida = checkpoint.vida;
        inventario = [...checkpoint.inventario];
        alert("Progresso carregado.");
        mostrarInventario();
    } else {
        alert("Nenhum checkpoint salvo.");
    }
}

// Primeira fase: Venezuela
function faseVenezuela() {
    if (jogoAcabado) return;

    alert("Você está na Venezuela. A situação no país está cada vez mais difícil, com escassez de alimentos e violência crescente.");

    let escolha1 = prompt("Você decide: \n1. Ficar na Venezuela e tentar sobreviver. \n2. Fugir do país em busca de uma vida melhor.");

    if (escolha1 === "1") {
        alert("Você decide ficar, mas a situação fica insustentável. Você perde forças dia após dia.");
        ajustarVida(-40); // A perda de vida é maior para quem decide ficar
        if (!jogoAcabado) conversarComNpcVenezuela();
    } else if (escolha1 === "2") {
        alert("Você decide fugir do país. A viagem é perigosa e cheia de obstáculos, mas você consegue sobreviver.");
        ajustarVida(-20);
        adicionarInventario("Determinação");
        if (!jogoAcabado) faseMexico();
    } else {
        alert("Escolha inválida. Tente novamente.");
        faseVenezuela();
    }
}

// Interação com NPC na Venezuela
function conversarComNpcVenezuela() {
    if (jogoAcabado) return;

    if (temItem("Empatia")) {
        alert("Você encontra um velho amigo que oferece ajuda para escapar da Venezuela.");

        let escolha2 = prompt("Você aceita a ajuda dele? \n1. Sim \n2. Não");

        if (escolha2 === "1") {
            alert("Seu amigo te ajuda a escapar, e você leva com você um amuleto da sorte.");
            adicionarInventario("Amuleto da Sorte");
            salvarCheckpoint();
            faseMexico();
        } else if (escolha2 === "2") {
            alert("Você decide não aceitar a ajuda, mas logo percebe que não conseguirá sobreviver sozinho.");
            ajustarVida(-30); // A perda de vida é maior por não aceitar ajuda
            if (!jogoAcabado) faseMexico();
        } else {
            alert("Escolha inválida. Tente novamente.");
            conversarComNpcVenezuela();
        }
    } else {
        alert("Você não possui 'Empatia' suficiente para interagir com este NPC.");
        faseMexico();
    }
}

// Segunda fase: México
function faseMexico() {
    if (jogoAcabado) return;

    alert("Você chegou ao México, um lugar de esperança, mas também de grandes desafios para refugiados.");

    let escolha3 = prompt("Você decide: \n1. Procurar trabalho e treinar para o esporte. \n2. Ficar na sombra e evitar problemas.");

    if (escolha3 === "1") {
        alert("Você encontra um pequeno trabalho que te permite ganhar o suficiente para sobreviver e treinar. Sua determinação e habilidade crescem.");
        ajustarVida(20);
        adicionarInventario("Empatia");
        salvarCheckpoint();
        conversarComNpcMexico();
    } else if (escolha3 === "2") {
        alert("Você decide evitar problemas e se manter discreto, mas isso limita suas oportunidades e sua saúde é afetada.");
        ajustarVida(-20); // A perda de vida é maior por evitar oportunidades
        salvarCheckpoint();
        conversarComNpcMexico();
    } else {
        alert("Escolha inválida. Tente novamente.");
        faseMexico();
    }
}

// Interação com NPC no México
function conversarComNpcMexico() {
    if (jogoAcabado) return;

    if (temItem("Empatia")) {
        alert("Enquanto trabalha, você conhece um ex-atleta que vê potencial em você e oferece treinamento.");

        let escolha4 = prompt("Você aceita o treinamento? \n1. Sim \n2. Não");

        if (escolha4 === "1") {
            alert("Com o treinamento intensivo, suas habilidades melhoram muito. Você também ganha um mentor dedicado.");
            ajustarVida(30);
            adicionarInventario("Confiança");
            salvarCheckpoint();
            encontrarTrabalhadorOng();
        } else if (escolha4 === "2") {
            alert("Você decide treinar sozinho, mas sem orientação sua progressão é mais lenta e sua saúde é comprometida.");
            ajustarVida(-20); // A perda de vida é maior por não aceitar o treinamento
            salvarCheckpoint();
            encontrarTrabalhadorOng();
        } else {
            alert("Escolha inválida. Tente novamente.");
            conversarComNpcMexico();
        }
    } else {
        alert("Você não possui 'Empatia' suficiente para interagir com este NPC.");
        encontrarTrabalhadorOng();
    }
}

// Interação com NPC de uma ONG
function encontrarTrabalhadorOng() {
    if (jogoAcabado) return;

    alert("Um trabalhador de uma ONG que ajuda refugiados te encontra e oferece apoio adicional.");

    let escolha5 = prompt("Ele oferece: \n1. Equipamentos esportivos. \n2. Um local seguro para treinar.");

    if (escolha5 === "1") {
        alert("Com os novos equipamentos, seu desempenho melhora significativamente.");
        adicionarInventario("Equipamentos Esportivos");
        ajustarVida(20);
        salvarCheckpoint();
        faseOlimpica();
    } else if (escolha5 === "2") {
        alert("No local seguro, você pode treinar em paz e ganhar mais resistência.");
        ajustarVida(20);
        adicionarInventario("Resistência");
        salvarCheckpoint();
        faseOlimpica();
    } else {
        alert("Escolha inválida. Tente novamente.");
        encontrarTrabalhadorOng();
    }
}

// Terceira fase: Jogos Olímpicos
function faseOlimpica() {
    if (jogoAcabado) return;

    alert("Você chegou aos Jogos Olímpicos! A competição é intensa e você precisa tomar decisões estratégicas.");

    let escolha6 = prompt("Você decide: \n1. Competir com toda sua força, usando tudo o que aprendeu. \n2. Jogar seguro e tentar uma posição mediana. \n3. Tirar um dia para se recuperar e analisar a competição.");

    if (escolha6 === "1") {
        if (temItem("Confiança") && temItem("Equipamentos Esportivos") && vida >= 80) {
            alert("Sua coragem, treinamento e equipamentos foram essenciais! Você se destacou nos Jogos Olímpicos!");
            alert("Parabéns, você ganhou o jogo!");
        } else {
            alert("Apesar dos seus esforços, você não conseguiu superar os adversários mais preparados.");
            alert("Você perdeu o jogo.");
            jogoAcabado = true;
        }
    } else if (escolha6 === "2") {
        if (vida >= 60) {
            alert("Você competiu de forma segura e conseguiu uma posição decente nos Jogos.");
            alert("Parabéns, você completou o jogo!");
        } else {
            alert("Sua abordagem conservadora não foi suficiente para garantir uma boa posição.");
            alert("Você perdeu o jogo.");
            jogoAcabado = true;
        }
    } else if (escolha6 === "3") {
        alert("Você decide tirar um dia para se recuperar e analisar a competição. Isso melhora seu foco e preparo mental.");

        let escolha7 = prompt("Com a recuperação, você decide: \n1. Competir com toda sua força no próximo evento. \n2. Continuar com a abordagem segura.");

        if (escolha7 === "1") {
            if (temItem("Confiança") && temItem("Equipamentos Esportivos") && vida >= 80) {
                alert("Sua recuperação e preparação foram fundamentais! Você se destaca e alcança o pódio.");
                alert("Parabéns, você ganhou o jogo!");
            } else {
                alert("Sua recuperação ajudou, mas você ainda não está no melhor estado possível.");
                alert("Você não conseguiu uma boa posição.");
                alert("Você perdeu o jogo.");
                jogoAcabado = true;
            }
        } else if (escolha7 === "2") {
            if (vida >= 60) {
                alert("Você continua com a abordagem segura e consegue manter uma posição respeitável nos Jogos.");
                alert("Parabéns, você completou o jogo!");
            } else {
                alert("Mesmo com a recuperação, sua abordagem segura não foi suficiente para garantir uma boa posição.");
                alert("Você perdeu o jogo.");
                jogoAcabado = true;
            }
        } else {
            alert("Escolha inválida. Tente novamente.");
            faseOlimpica();
        }
    } else {
        alert("Escolha inválida. Tente novamente.");
        faseOlimpica();
    }
}

// Início do jogo
function iniciarJogo() {
    vida = 100;
    inventario = [];
    jogoAcabado = false;
    checkpoint = null;
    faseVenezuela();
}

iniciarJogo();
