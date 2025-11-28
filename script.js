// ========================================
// SCHOOLBOY CENTER - JAVASCRIPT
// ========================================

// ===== NAVEGAÇÃO SUAVE =====
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== DESTACAR LINK ATIVO NO MENU =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menu-link');

function onScrollHighlight() {
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
        const sectionTop = sec.offsetTop - 120;
        const sectionHeight = sec.offsetHeight;
        const sectionId = sec.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('ativo'));
            const activeLink = document.querySelector(`.menu-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('ativo');
        }
    });
}

window.addEventListener('scroll', onScrollHighlight);

// ===== TOGGLE LIGHT MODE =====
const toggleModeBtn = document.getElementById('toggle-mode');

if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
}

// ===== CHATBOT DE SUPORTE (LingoBot) =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// Abrir / fechar o chat
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.style.display =
            chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });
}

// Adicionar mensagens ao chat
function addChatMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `chatbot-message ${sender}`;
    msg.innerHTML = text;

    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Lógica simples de resposta da IA (LingoBot)
function handleUserMessage(message) {
    const texto = message.toLowerCase();

    // Valores / preços / mensalidade
    if (
        texto.includes('valor') ||
        texto.includes('preço') ||
        texto.includes('preços') ||
        texto.includes('mensalidade') ||
        texto.includes('mensalidades')
    ) {
        addChatMessage(
            `As mensalidades variam de acordo com o nível:<br>
            • A1: R$ 180/mês<br>
            • A2: R$ 200/mês<br>
            • B1: R$ 210/mês<br>
            • B2: R$ 220/mês<br>
            • C1: R$ 240/mês<br>
            • C2: R$ 250/mês<br><br>
            Você também pode ver a tabela completa na seção <b>Mensalidades</b> do site.`
        );
        return;
    }

    // Informações sobre cursos / níveis
    if (
        texto.includes('curso') ||
        texto.includes('cursos') ||
        texto.includes('nível') ||
        texto.includes('niveis') ||
        texto.includes('níveis')
    ) {
        addChatMessage(
            `O Schoolboy Center trabalha com níveis do A1 ao C2, seguindo o padrão CEFR:<br>
            • A1 (Beginner)<br>
            • A2 (Elementary)<br>
            • B1 (Intermediate)<br>
            • B2 (Upper Intermediate)<br>
            • C1 (Advanced)<br>
            • C2 (Proficiency/Mastery)<br><br>
            Cada nível trabalha Reading, Listening, Writing e Speaking.`
        );
        return;
    }

    // Matrícula
    if (
        texto.includes('matrícula') ||
        texto.includes('matricula') ||
        texto.includes('me matricular') ||
        texto.includes('inscrição') ||
        texto.includes('inscrever')
    ) {
        addChatMessage(
            `Para fazer a matrícula, basta preencher o formulário na seção <b>Matrícula</b> do site com seus dados (nome, data de nascimento, nível de inglês etc.).<br><br>
            Se preferir, você também pode falar diretamente pelo WhatsApp: <b>(71) 99286-4210</b>.`
        );
        return;
    }

    // Contato / WhatsApp
    if (
        texto.includes('contato') ||
        texto.includes('whatsapp') ||
        texto.includes('telefone') ||
        texto.includes('email') ||
        texto.includes('e-mail')
    ) {
        addChatMessage(
            `Você pode falar com o Schoolboy Center pelos seguintes canais:<br>
            • WhatsApp/Telefone: <b>(71) 99286-4210</b><br>
            • E-mail: <b>schoolboycenter2016@gmail.com</b><br><br>
            Fique à vontade para enviar suas dúvidas!`
        );
        return;
    }

    // Saudação
    if (
        texto.includes('oi') ||
        texto.includes('olá') ||
        texto.includes('ola') ||
        texto.includes('bom dia') ||
        texto.includes('boa tarde') ||
        texto.includes('boa noite')
    ) {
        addChatMessage(
            `Olá! Eu sou o <b>LingoBot</b> 🤖.<br>
            Como posso te ajudar hoje?<br>
            Você pode perguntar sobre <b>valores</b>, <b>cursos</b>, <b>níveis</b>, <b>matrícula</b> ou <b>contatos</b>.`
        );
        return;
    }

    // Resposta padrão
    addChatMessage(
        `Ainda sou um assistente simples 🤖 e respondo melhor sobre:<br>
        • Valores / mensalidades<br>
        • Informações dos cursos e níveis<br>
        • Como funciona a matrícula<br>
        • Formas de contato<br><br>
        Tente perguntar algo sobre esses temas.`
    );
}

// Envio de mensagem
function sendUserMessage() {
    const texto = chatbotInput.value.trim();
    if (!texto) return;

    addChatMessage(texto, 'user');
    chatbotInput.value = '';

    setTimeout(() => handleUserMessage(texto), 300);
}

if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', sendUserMessage);

    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendUserMessage();
        }
    });
}

// ===== CONSOLE E ESTILO HEADER AO ROLAR =====
console.log('%c🎓 Bem-vindo ao Schoolboy Center! 🎓', 'color: #A66A3C; font-size: 20px; font-weight: bold;');
console.log('%cVisite nossas redes sociais para mais conteúdo!', 'color: #5C5248; font-size: 14px;');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const header = document.querySelector('.topo');
    if (header) {
        if (scrollTop > 50) {
            header.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});
