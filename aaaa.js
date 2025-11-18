// ========================================
// SCHOOLBOY CENTER - JAVASCRIPT
// ========================================

// Alternar modo claro/escuro
const themeToggle = document.getElementById('themeToggle');
const contentWrapper = document.querySelector('.content-wrapper');

themeToggle.addEventListener('click', () => {
    contentWrapper.classList.toggle('light-mode');
    
    // Alterna o emoji
    if (contentWrapper.classList.contains('light-mode')) {
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }
});

// Scroll suave para os links do menu
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const contentWrapper = document.querySelector('.content-wrapper');

        if (targetElement) {
            // Calcula a posição do elemento relativo ao topo do wrapper de scroll
            const targetTop = targetElement.offsetTop - parseInt(getComputedStyle(contentWrapper).paddingTop, 10);
            contentWrapper.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Previne o envio do formulário de Matrícula e exibe mensagem
const registerButton = document.querySelector('#matricula .side-button');

if (registerButton) {
    registerButton.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove modal existente se houver
        const existingModal = document.querySelector('.custom-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Cria o modal
        const messageBox = document.createElement('div');
        messageBox.classList.add('custom-modal');
        messageBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--cor-secundaria) 0%, var(--cor-primaria) 100%);
            color: var(--cor-fundo-escuro);
            padding: 2rem;
            border-radius: 16px;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            font-family: 'Inter', sans-serif;
            text-align: center;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        messageBox.innerHTML = `
            <p style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">✅ Matrícula Simulada!</p>
            <p style="font-size: 1rem; line-height: 1.6;">A função de cadastro não está ativa nesta prévia. Este é apenas um exemplo visual do formulário.</p>
            <button onclick="this.parentNode.remove()" 
                style="
                    margin-top: 1.5rem;
                    background-color: var(--cor-fundo-escuro);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">
                Entendido
            </button>
        `;
        
        document.body.appendChild(messageBox);

        // Adiciona overlay de fundo
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
        `;
        overlay.onclick = () => {
            messageBox.remove();
            overlay.remove();
        };
        document.body.appendChild(overlay);

        // Remove o modal e overlay ao clicar no botão
        messageBox.querySelector('button').onclick = () => {
            messageBox.remove();
            overlay.remove();
        };
    });
}

// Animação de entrada dos cards ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa todas as seções
document.querySelectorAll('.secao').forEach(secao => {
    secao.style.opacity = '0';
    secao.style.transform = 'translateY(20px)';
    secao.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(secao);
});

// Validação básica do formulário
const form = document.querySelector('#matricula > div');
if (form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = 'var(--cor-borda-suave)';
            }
        });
    });
}

// Adiciona animação de hover aos itens da tabela
const tableRows = document.querySelectorAll('.tabela-body tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(166, 106, 60, 0.15)';
    });
    
    row.addEventListener('mouseleave', function() {
        if (this.classList.contains('even')) {
            this.style.backgroundColor = '#fdfaf3';
        } else {
            this.style.backgroundColor = 'transparent';
        }
    });
});

console.log('🎓 Schoolboy Center SBC - Site carregado com sucesso!');