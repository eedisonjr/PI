// -------------------------------
// navegação suave nos links do menu
// -------------------------------
document.querySelectorAll(".menu-link[href^='#'], .menu-link[href*='home.html#'], .menu-link[href*='index.html#']")
    .forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            // links absolutos para outra página não fazem scroll suave
            if (!href || href.startsWith("http") || href.includes(".html#") && !location.href.includes(href.split("#")[0])) {
                return;
            }

            e.preventDefault();
            const id = href.split("#")[1];
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

// -------------------------------
// destaca link ativo ao rolar
// -------------------------------
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".menu-link[href*='#']");

function onScrollHighlight() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const h = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (scrollY >= top && scrollY < top + h) {
            navLinks.forEach(l => l.classList.remove("ativo"));
            const active = document.querySelector(`.menu-link[href$="#${id}"]`);
            if (active) active.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", onScrollHighlight);

// -------------------------------
// toggle light mode
// -------------------------------
const toggleModeBtn = document.getElementById("toggle-mode");
if (toggleModeBtn) {
    toggleModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}

// -------------------------------
// chatbot simples
// -------------------------------
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
        chatbotWindow.style.display =
            chatbotWindow.style.display === "flex" ? "none" : "flex";
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
        chatbotWindow.style.display = "none";
    });
}

function addChatMessage(text, sender = "bot") {
    if (!chatbotMessages) return;
    const msg = document.createElement("div");
    msg.className = `chatbot-message ${sender}`;
    msg.innerHTML = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleUserMessage(message) {
    const texto = message.toLowerCase();

    if (
        texto.includes("valor") ||
        texto.includes("preço") ||
        texto.includes("preços") ||
        texto.includes("mensalidade") ||
        texto.includes("mensalidades")
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

    if (
        texto.includes("curso") ||
        texto.includes("cursos") ||
        texto.includes("nível") ||
        texto.includes("niveis") ||
        texto.includes("níveis")
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

    if (
        texto.includes("matrícula") ||
        texto.includes("matricula") ||
        texto.includes("me matricular") ||
        texto.includes("inscrição") ||
        texto.includes("inscrever")
    ) {
        addChatMessage(
            `Para fazer a matrícula, basta preencher o formulário na seção <b>Matrícula</b> do site com seus dados (nome, data de nascimento, nível de inglês etc.).<br><br>
      Se preferir, você também pode falar diretamente pelo WhatsApp: <b>(71) 99286-4210</b>.`
        );
        return;
    }

    if (
        texto.includes("contato") ||
        texto.includes("whatsapp") ||
        texto.includes("telefone") ||
        texto.includes("email") ||
        texto.includes("e-mail")
    ) {
        addChatMessage(
            `Você pode falar com o Schoolboy Center pelos seguintes canais:<br>
      • WhatsApp/Telefone: <b>(71) 99286-4210</b><br>
      • E-mail: <b>schoolboycenter2016@gmail.com</b><br><br>
      Fique à vontade para enviar suas dúvidas!`
        );
        return;
    }

    if (
        texto.includes("oi") ||
        texto.includes("olá") ||
        texto.includes("ola") ||
        texto.includes("bom dia") ||
        texto.includes("boa tarde") ||
        texto.includes("boa noite")
    ) {
        addChatMessage(
            `Olá! Eu sou o <b>LingoBot</b> 🤖.<br>
      Como posso te ajudar hoje?<br>
      Você pode perguntar sobre <b>valores</b>, <b>cursos</b>, <b>níveis</b>, <b>matrícula</b> ou <b>contatos</b>.`
        );
        return;
    }

    addChatMessage(
        `Ainda sou um assistente simples 🤖 e respondo melhor sobre:<br>
    • Valores / mensalidades<br>
    • Informações dos cursos e níveis<br>
    • Como funciona a matrícula<br>
    • Formas de contato<br><br>
    Tente perguntar algo sobre esses temas.`
    );
}

function sendUserMessage() {
    if (!chatbotInput) return;
    const texto = chatbotInput.value.trim();
    if (!texto) return;
    addChatMessage(texto, "user");
    chatbotInput.value = "";
    setTimeout(() => handleUserMessage(texto), 300);
}

if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener("click", sendUserMessage);
    chatbotInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendUserMessage();
        }
    });
}

// -------------------------------
// i18n - traduções para LP + home
// -------------------------------
const translations = {
    pt: {
        // navegação
        "nav-home": "Home",
        "nav-about": "Sobre",
        "nav-social": "Redes Sociais",
        "nav-pricing": "Mensalidades",
        "nav-enroll": "Matrícula",
        "nav-contact": "Contato",
        "nav-courses": "Cursos",

        // hero LP (já existia no index)
        "hero-title": "Inglês com espírito de savana, alma de comunidade.",
        "hero-subtitle":
            "O Schoolboy Center SBC oferece aulas de inglês com foco em comunicação real, acolhimento e evolução constante — do nível A1 ao C2.",
        "btn-enroll": "Quero me matricular",
        "btn-pricing": "Ver mensalidades",

        // ... (demais textos da LP que você já tinha – mantidos)
        // vou deixar TODO o bloco original da LP aqui:
        "hero-card-title": "Comece hoje mesmo",
        "hero-card-text":
            "Faça o teste de nível, escolha o plano ideal e venha fazer parte da nossa comunidade de alunos.",
        "hero-card-item1": "Aulas em pequenos grupos",
        "hero-card-item2": "Foco em conversação",
        "hero-card-item3": "Acompanhamento personalizado",
        "about-title": "Sobre o Schoolboy Center",
        "about-subtitle":
            "Somos uma escola de inglês que acredita que aprender um idioma vai muito além da gramática: é sobre cultura, liberdade e oportunidades.",
        "about-box1-title": "Metodologia viva",
        "about-box1-text":
            "Aulas dinâmicas, com foco em situações reais, usando músicas, vídeos, jogos e conversas.",
        "about-box2-title": "Do básico ao avançado",
        "about-box2-text":
            "Trabalhamos com os níveis A1, A2, B1, B2, C1 e C2, seguindo o padrão internacional CEFR.",
        "about-box3-title": "Comunidade acolhedora",
        "about-box3-text":
            "Um ambiente seguro para errar, praticar e crescer — sem julgamentos.",
        "social-title": "Aprenda também pelas redes sociais",
        "social-subtitle":
            "Conteúdos gratuitos para você praticar inglês todos os dias nas suas plataformas favoritas.",
        "social-tiktok-title": "TikTok",
        "social-tiktok-text":
            "No TikTok, você encontra vídeos curtos, posts e fotos preparados com criatividade para lhe ajudar a melhorar o seu inglês.",
        "social-tiktok-btn": "Siga SBC no TikTok",
        "social-instagram-title": "Instagram",
        "social-instagram-text":
            "No Instagram, você encontra vídeos curtos, posts e fotos preparados com criatividade para lhe ajudar a melhorar o seu inglês.",
        "social-instagram-btn": "Siga SBC no Instagram",
        "social-facebook-title": "Facebook",
        "social-facebook-text":
            "No Facebook, você encontra conteúdos curtos de vídeos, posts e fotos preparados com criatividade para lhe ajudar a melhorar o seu inglês.",
        "social-facebook-btn": "Siga SBC no Facebook",
        "pricing-title": "Mensalidades",
        "pricing-subtitle":
            "Planos pensados para caber no seu bolso e acompanhar seu ritmo de aprendizagem.",
        "pricing-banner": "<span><em>Hurray, o preço é acessível!</em></span>",
        "pricing-col-level": "Nível",
        "pricing-col-desc": "Descrição",
        "pricing-col-value": "Valor",
        "pricing-a1-desc": "Beginner = (Iniciante)",
        "pricing-a2-desc": "Elementary = (Básico)",
        "pricing-b1-desc": "Intermediate = (Intermediário)",
        "pricing-b2-desc": "Upper Intermediate = (Intermediário Avançado)",
        "pricing-c1-desc": "Advanced = (Avançado)",
        "pricing-c2-desc": "Proficiency/Mastery = (Fluência/Mestria)",
        "enroll-title": "Formulário de Matrícula",
        "enroll-subtitle":
            "Preencha seus dados para que possamos entrar em contato e concluir sua matrícula.",
        "enroll-level-label": "Nível de Inglês",
        "enroll-level-placeholder": "Selecione o nível",
        "enroll-name-label": "Nome Completo",
        "enroll-birth-label": "Data de Nascimento",
        "enroll-gender-label": "Gênero / Gender",
        "enroll-gender-male": "Masculino",
        "enroll-gender-female": "Feminino",
        "enroll-gender-other": "Outro / Prefiro não dizer",
        "enroll-phone-label": "Telefone / WhatsApp",
        "enroll-email-label": "E-mail",
        "enroll-contact-label": "Forma de Contato Preferida",
        "enroll-contact-placeholder": "Selecione",
        "enroll-contact-whatsapp": "WhatsApp",
        "enroll-contact-call": "Ligação",
        "enroll-contact-email": "E-mail",
        "enroll-message-label":
            "Conte um pouco sobre você e seu objetivo com o inglês",
        "enroll-terms":
            "Confirmo que li e aceito os termos de uso e política de privacidade do Schoolboy Center.",
        "enroll-submit": "Enviar inscrição",
        "contact-title": "Contato",
        "contact-subtitle": "Fale com o Schoolboy Center pelos canais abaixo.",
        "contact-info-title": "Informações de contato",
        "contact-phone": "(71) 99286-4210",
        "contact-email": "schoolboycenter2016@gmail.com",
        "contact-whatsapp": "WhatsApp: (71) 99286-4210",
        "contact-hours-title": "Horários de atendimento",
        "contact-hours-text":
            "Segunda a sexta: 8h às 21h<br>Sábado: 8h às 12h",
        "contact-extra-text":
            "Responderemos sua mensagem o mais breve possível.",

        // -------- home: hero --------
        "home-hero-title": "Schoolboy Center — Inglês para a vida real",
        "home-hero-subtitle":
            "Conectamos método, prática e comunidade para transformar seu inglês em ferramenta de liberdade profissional e pessoal.",
        "home-hero-btn-enroll": "Matricule-se",
        "home-hero-btn-courses": "Ver cursos",
        "home-hero-btn-contact": "Fale conosco",
        "home-hero-stat-students": "alunos ativos",
        "home-hero-stat-satisfaction": "satisfação",
        "home-hero-stat-years": "anos de operação",
        "home-vision-title": "Visão e missão",
        "home-vision-text":
            "Preparar alunos para usar o inglês com confiança em situações reais — viagens, trabalho e estudos. Apoiamos resultados mensuráveis e crescimento contínuo.",

        // home: cursos
        "home-courses-title": "Cursos em destaque",
        "home-courses-subtitle":
            "formatos pensados para diferentes objetivos — escolha o que combina com você.",
        "home-course-group-tag": "aulas em grupo",
        "home-course-group-title": "Grupo semanal",
        "home-course-group-desc":
            "aulas semanais com foco em conversação e prática contextual.",
        "home-course-individual-tag": "individual",
        "home-course-individual-title": "Aulas particulares",
        "home-course-individual-desc":
            "plano individualizado com conteúdo sob medida e flexibilidade de horário.",
        "home-course-individual-price": "Sob consulta",
        "home-course-intensive-tag": "intensivo",
        "home-course-intensive-title": "Intensivo de certificação",
        "home-course-intensive-desc":
            "treinamento intensivo para provas e exames com simulações e feedback personalizado.",
        "home-course-intensive-price": "R$ 450 (intensivo)",
        "home-course-btn-enroll": "Matricule-se",

        // home: diferenciais
        "home-diff-title": "Diferenciais",
        "home-diff-subtitle": "o que nos torna únicos no ensino do inglês.",
        "home-diff-1-title": "Metodologia ativa",
        "home-diff-1-text":
            "atividades práticas, role-plays e projetos aplicados ao cotidiano.",
        "home-diff-2-title": "Professores qualificados",
        "home-diff-2-text":
            "formação internacional com foco em fluência comunicativa.",
        "home-diff-3-title": "Acompanhamento",
        "home-diff-3-text":
            "planos de evolução com feedbacks regulares e metas claras.",

        // home: depoimentos
        "home-testimonials-title": "Depoimentos",
        "home-testimonials-subtitle": "o que alunos falam sobre a experiência.",

        // home: equipe
        "home-team-title": "Equipe",
        "home-team-subtitle": "profissionais por trás das aulas.",

        // home: cta final
        "home-cta-title": "Pronto para transformar seu inglês?",
        "home-cta-subtitle":
            "faça o teste de nível e garanta sua vaga. acesse a página de matrícula.",
        "home-cta-btn": "Ir para matrícula"
    },

    // ---------------- en ----------------
    en: {
        "nav-home": "Home",
        "nav-about": "About",
        "nav-social": "Social Media",
        "nav-pricing": "Pricing",
        "nav-enroll": "Enrollment",
        "nav-contact": "Contact",
        "nav-courses": "Courses",

        "hero-title": "English with savanna spirit, community soul.",
        "hero-subtitle":
            "Schoolboy Center SBC offers English classes focused on real communication, a welcoming environment, and constant progress — from level A1 to C2.",
        "btn-enroll": "I want to enroll",
        "btn-pricing": "See pricing",

        "hero-card-title": "Start today",
        "hero-card-text":
            "Take the placement test, choose the ideal plan and join our learning community.",
        "hero-card-item1": "Classes in small groups",
        "hero-card-item2": "Focus on conversation",
        "hero-card-item3": "Personalized follow-up",

        "about-title": "About Schoolboy Center",
        "about-subtitle":
            "We believe learning a language goes far beyond grammar: it is about culture, freedom and opportunities.",
        "about-box1-title": "Living methodology",
        "about-box1-text":
            "Dynamic lessons focused on real situations, using songs, videos, games and conversations.",
        "about-box2-title": "From basic to advanced",
        "about-box2-text":
            "We work with levels A1, A2, B1, B2, C1 and C2, following the international CEFR standard.",
        "about-box3-title": "Welcoming community",
        "about-box3-text":
            "A safe environment to make mistakes, practice and grow — without judgment.",

        "social-title": "Learn also through social media",
        "social-subtitle":
            "Free content for you to practice English every day on your favorite platforms.",
        "social-tiktok-title": "TikTok",
        "social-tiktok-text":
            "On TikTok you find short videos, posts and photos creatively prepared to help you improve your English.",
        "social-tiktok-btn": "Follow SBC on TikTok",
        "social-instagram-title": "Instagram",
        "social-instagram-text":
            "On Instagram you find short videos, posts and photos creatively prepared to help you improve your English.",
        "social-instagram-btn": "Follow SBC on Instagram",
        "social-facebook-title": "Facebook",
        "social-facebook-text":
            "On Facebook you find short videos, posts and photos creatively prepared to help you improve your English.",
        "social-facebook-btn": "Follow SBC on Facebook",

        "pricing-title": "Pricing",
        "pricing-subtitle":
            "Plans designed to fit your budget and match your learning pace.",
        "pricing-banner": "<span><em>Hurray, the price is affordable!</em></span>",
        "pricing-col-level": "Level",
        "pricing-col-desc": "Description",
        "pricing-col-value": "Price",
        "pricing-a1-desc": "Beginner",
        "pricing-a2-desc": "Elementary",
        "pricing-b1-desc": "Intermediate",
        "pricing-b2-desc": "Upper Intermediate",
        "pricing-c1-desc": "Advanced",
        "pricing-c2-desc": "Proficiency / Mastery",

        "enroll-title": "Enrollment form",
        "enroll-subtitle":
            "Fill in your information so we can contact you and complete your enrollment.",
        "enroll-level-label": "English level",
        "enroll-level-placeholder": "Select your level",
        "enroll-name-label": "Full name",
        "enroll-birth-label": "Date of birth",
        "enroll-gender-label": "Gender",
        "enroll-gender-male": "Male",
        "enroll-gender-female": "Female",
        "enroll-gender-other": "Other / Prefer not to say",
        "enroll-phone-label": "Phone / WhatsApp",
        "enroll-email-label": "E-mail",
        "enroll-contact-label": "Preferred contact method",
        "enroll-contact-placeholder": "Select",
        "enroll-contact-whatsapp": "WhatsApp",
        "enroll-contact-call": "Phone call",
        "enroll-contact-email": "E-mail",
        "enroll-message-label":
            "Tell us a little about yourself and your goal with English",
        "enroll-terms":
            "I confirm that I have read and accept the terms of use and privacy policy of Schoolboy Center.",
        "enroll-submit": "Send application",

        "contact-title": "Contact",
        "contact-subtitle":
            "Get in touch with Schoolboy Center through the channels below.",
        "contact-info-title": "Contact information",
        "contact-phone": "+55 (71) 99286-4210",
        "contact-email": "schoolboycenter2016@gmail.com",
        "contact-whatsapp": "WhatsApp: +55 (71) 99286-4210",
        "contact-hours-title": "Service hours",
        "contact-hours-text":
            "Monday to Friday: 8am to 9pm<br>Saturday: 8am to 12pm",
        "contact-extra-text":
            "We will answer your message as soon as possible.",

        // home hero
        "home-hero-title": "Schoolboy Center — English for real life",
        "home-hero-subtitle":
            "We connect method, practice and community to turn your English into a tool for professional and personal freedom.",
        "home-hero-btn-enroll": "Enroll now",
        "home-hero-btn-courses": "See courses",
        "home-hero-btn-contact": "Talk to us",
        "home-hero-stat-students": "active students",
        "home-hero-stat-satisfaction": "satisfaction",
        "home-hero-stat-years": "years of experience",
        "home-vision-title": "Vision and mission",
        "home-vision-text":
            "To prepare students to use English confidently in real situations — travel, work and study — with measurable results and constant growth.",

        "home-courses-title": "Featured courses",
        "home-courses-subtitle":
            "formats designed for different goals — choose what fits you best.",
        "home-course-group-tag": "group classes",
        "home-course-group-title": "Weekly group",
        "home-course-group-desc":
            "weekly lessons focused on conversation and contextual practice.",
        "home-course-individual-tag": "one-to-one",
        "home-course-individual-title": "Private lessons",
        "home-course-individual-desc":
            "custom learning plan with flexible schedule.",
        "home-course-individual-price": "On request",
        "home-course-intensive-tag": "intensive",
        "home-course-intensive-title": "Exam intensive",
        "home-course-intensive-desc":
            "intensive training for exams with simulations and detailed feedback.",
        "home-course-intensive-price": "R$ 450 (intensive)",
        "home-course-btn-enroll": "Enroll",

        "home-diff-title": "What makes us different",
        "home-diff-subtitle": "why students choose Schoolboy Center.",
        "home-diff-1-title": "Active methodology",
        "home-diff-1-text":
            "hands-on activities, role plays and projects connected to real life.",
        "home-diff-2-title": "Qualified teachers",
        "home-diff-2-text":
            "international background focused on communicative fluency.",
        "home-diff-3-title": "Ongoing follow-up",
        "home-diff-3-text":
            "progress plans with regular feedback and clear goals.",

        "home-testimonials-title": "Testimonials",
        "home-testimonials-subtitle": "what students say about us.",

        "home-team-title": "Our team",
        "home-team-subtitle": "teachers and coordinators behind the classes.",

        "home-cta-title": "Ready to transform your English?",
        "home-cta-subtitle":
            "take the placement test and secure your spot. go to the enrollment page.",
        "home-cta-btn": "Go to enrollment"
    },

    // ---------------- es ----------------
    es: {
        "nav-home": "Inicio",
        "nav-about": "Sobre nosotros",
        "nav-social": "Redes sociales",
        "nav-pricing": "Mensualidades",
        "nav-enroll": "Matrícula",
        "nav-contact": "Contacto",
        "nav-courses": "Cursos",

        "hero-title": "Inglés con espíritu de sabana y alma de comunidad.",
        "hero-subtitle":
            "Schoolboy Center SBC ofrece clases de inglés enfocadas en la comunicación real, un ambiente acogedor y una evolución constante, desde el nivel A1 hasta C2.",
        "btn-enroll": "Quiero matricularme",
        "btn-pricing": "Ver mensualidades",

        "hero-card-title": "Empieza hoy mismo",
        "hero-card-text":
            "Haz la prueba de nivel, elige el plan ideal y forma parte de nuestra comunidad de alumnos.",
        "hero-card-item1": "Clases en grupos reducidos",
        "hero-card-item2": "Enfoque en la conversación",
        "hero-card-item3": "Acompañamiento personalizado",

        "about-title": "Sobre Schoolboy Center",
        "about-subtitle":
            "Creemos que aprender un idioma va mucho más allá de la gramática: se trata de cultura, libertad y oportunidades.",
        "about-box1-title": "Metodología viva",
        "about-box1-text":
            "Clases dinámicas, enfocadas en situaciones reales, usando música, vídeos, juegos y conversaciones.",
        "about-box2-title": "Del básico al avanzado",
        "about-box2-text":
            "Trabajamos con los niveles A1, A2, B1, B2, C1 y C2, siguiendo el estándar internacional CEFR.",
        "about-box3-title": "Comunidad acogedora",
        "about-box3-text":
            "Un ambiente seguro para equivocarse, practicar y crecer, sin juicios.",

        "social-title": "Aprende también por las redes sociales",
        "social-subtitle":
            "Contenido gratuito para que practiques inglés todos los días en tus plataformas favoritas.",
        "social-tiktok-title": "TikTok",
        "social-tiktok-text":
            "En TikTok encuentras vídeos cortos, publicaciones y fotos preparados con creatividad para ayudarte a mejorar tu inglés.",
        "social-tiktok-btn": "Sigue a SBC en TikTok",
        "social-instagram-title": "Instagram",
        "social-instagram-text":
            "En Instagram encuentras vídeos cortos, publicaciones y fotos preparados con creatividad para ayudarte a mejorar tu inglés.",
        "social-instagram-btn": "Sigue a SBC en Instagram",
        "social-facebook-title": "Facebook",
        "social-facebook-text":
            "En Facebook encuentras vídeos, publicaciones y fotos preparados con creatividad para ayudarte a mejorar tu inglés.",
        "social-facebook-btn": "Sigue a SBC en Facebook",

        "pricing-title": "Mensualidades",
        "pricing-subtitle":
            "Planes pensados para adaptarse a tu bolsillo y a tu ritmo de aprendizaje.",
        "pricing-banner": "<span><em>¡Hurray, el precio es accesible!</em></span>",
        "pricing-col-level": "Nivel",
        "pricing-col-desc": "Descripción",
        "pricing-col-value": "Valor",
        "pricing-a1-desc": "Beginner = (Principiante)",
        "pricing-a2-desc": "Elementary = (Básico)",
        "pricing-b1-desc": "Intermediate = (Intermedio)",
        "pricing-b2-desc": "Upper Intermediate = (Intermedio avanzado)",
        "pricing-c1-desc": "Advanced = (Avanzado)",
        "pricing-c2-desc": "Proficiency/Mastery = (Fluidez/Maestría)",

        "enroll-title": "Formulario de matrícula",
        "enroll-subtitle":
            "Rellena tus datos para que podamos contactarte y completar tu matrícula.",
        "enroll-level-label": "Nivel de inglés",
        "enroll-level-placeholder": "Selecciona el nivel",
        "enroll-name-label": "Nombre completo",
        "enroll-birth-label": "Fecha de nacimiento",
        "enroll-gender-label": "Género",
        "enroll-gender-male": "Masculino",
        "enroll-gender-female": "Femenino",
        "enroll-gender-other": "Otro / Prefiero no decirlo",
        "enroll-phone-label": "Teléfono / WhatsApp",
        "enroll-email-label": "Correo electrónico",
        "enroll-contact-label": "Medio de contacto preferido",
        "enroll-contact-placeholder": "Selecciona",
        "enroll-contact-whatsapp": "WhatsApp",
        "enroll-contact-call": "Llamada",
        "enroll-contact-email": "Correo",
        "enroll-message-label":
            "Cuéntanos un poco sobre ti y tu objetivo con el inglés",
        "enroll-terms":
            "Confirmo que he leído y acepto los términos de uso y la política de privacidad de Schoolboy Center.",
        "enroll-submit": "Enviar solicitud",

        "contact-title": "Contacto",
        "contact-subtitle": "Habla con Schoolboy Center por los siguientes canales.",
        "contact-info-title": "Información de contacto",
        "contact-phone": "+55 (71) 99286-4210",
        "contact-email": "schoolboycenter2016@gmail.com",
        "contact-whatsapp": "WhatsApp: +55 (71) 99286-4210",
        "contact-hours-title": "Horario de atención",
        "contact-hours-text":
            "Lunes a viernes: 8h a 21h<br>Sábados: 8h a 12h",
        "contact-extra-text":
            "Responderemos tu mensaje lo antes posible.",

        "home-hero-title": "Schoolboy Center — Inglés para la vida real",
        "home-hero-subtitle":
            "Conectamos método, práctica y comunidad para transformar tu inglés en una herramienta de libertad profesional y personal.",
        "home-hero-btn-enroll": "Matricularme",
        "home-hero-btn-courses": "Ver cursos",
        "home-hero-btn-contact": "Hablar con nosotros",
        "home-hero-stat-students": "alumnos activos",
        "home-hero-stat-satisfaction": "satisfacción",
        "home-hero-stat-years": "años de experiencia",
        "home-vision-title": "Visión y misión",
        "home-vision-text":
            "Preparar a los alumnos para usar el inglés con confianza en situaciones reales — viajes, trabajo y estudios — con resultados medibles y crecimiento continuo.",

        "home-courses-title": "Cursos destacados",
        "home-courses-subtitle":
            "formatos pensados para diferentes objetivos — elige el que mejor se adapte a ti.",
        "home-course-group-tag": "clases en grupo",
        "home-course-group-title": "Grupo semanal",
        "home-course-group-desc":
            "clases semanales con enfoque en conversación y práctica contextual.",
        "home-course-individual-tag": "individual",
        "home-course-individual-title": "Clases particulares",
        "home-course-individual-desc":
            "plan personalizado con contenido a medida y horario flexible.",
        "home-course-individual-price": "A consultar",
        "home-course-intensive-tag": "intensivo",
        "home-course-intensive-title": "Intensivo de certificación",
        "home-course-intensive-desc":
            "entrenamiento intensivo para exámenes con simulaciones y feedback personalizado.",
        "home-course-intensive-price": "R$ 450 (intensivo)",
        "home-course-btn-enroll": "Matricularme",

        "home-diff-title": "Diferenciales",
        "home-diff-subtitle": "lo que nos hace únicos en la enseñanza del inglés.",
        "home-diff-1-title": "Metodología activa",
        "home-diff-1-text":
            "actividades prácticas, role-plays y proyectos aplicados al día a día.",
        "home-diff-2-title": "Profesores calificados",
        "home-diff-2-text":
            "formación internacional con enfoque en fluidez comunicativa.",
        "home-diff-3-title": "Acompañamiento",
        "home-diff-3-text":
            "planes de evolución con feedbacks regulares y metas claras.",

        "home-testimonials-title": "Testimonios",
        "home-testimonials-subtitle": "lo que dicen nuestros alumnos.",

        "home-team-title": "Equipo",
        "home-team-subtitle": "profesionales detrás de las clases.",

        "home-cta-title": "¿Listo para transformar tu inglés?",
        "home-cta-subtitle":
            "haz la prueba de nivel y asegura tu plaza. accede a la página de matrícula.",
        "home-cta-btn": "Ir a matrícula"
    }
};

function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
        btn.classList.toggle("ativo", btn.dataset.lang === lang);
    });

    // guarda escolha (opcional)
    try {
        localStorage.setItem("sbc-lang", lang);
    } catch (e) { }
}

document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

// idioma padrão (usa localStorage se existir)
const savedLang = (function () {
    try {
        return localStorage.getItem("sbc-lang");
    } catch (e) {
        return null;
    }
})();
setLanguage(savedLang || "pt");

// -------------------------------
// animação de aparição (.home-reveal)
// -------------------------------
(function () {
    const elements = document.querySelectorAll(".home-reveal");
    if (!elements.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add("in-view");
        });
    }, { threshold: 0.12 });

    elements.forEach(el => obs.observe(el));
})();
