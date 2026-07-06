let slideAtual = 0;

function inicializarSlider() {
    const slides = document.getElementById('slides');
    if (!slides) return;

    setInterval(() => {
        mudarSlide(1);
    }, 5000);
}

function mudarSlide(direcao) {
    const slides = document.getElementById('slides');
    if (!slides) return;

    const totalSlides = slides.children.length;
    slideAtual += direcao;

    if (slideAtual < 0) slideAtual = totalSlides - 1;
    if (slideAtual >= totalSlides) slideAtual = 0;

    slides.style.transform = `translateX(-${slideAtual * 100}%)`;
}

const produtos = [
    { nome: "Chinelo Nuvem Bordô", preco: "59,90", tag: "nuvem conforto", img: "https://http2.mlstatic.com/D_NQ_NP_835735-MLB76044626118_052024-O-chinelo-nuvem-dedo-plataforma-trancada-leve-sandalia-33-a-40.webp" },
    { nome: "Chinelo Slide Bege", preco: "45,00", tag: "slide casual", img: "https://projetoinfluencer.vteximg.com.br/arquivos/ids/6954009-640-960/Chinelo-Tropical-Brasil-Bi-Color-Slim-Bege.jpg?v=638792877422100000" },
    { nome: "Chinelo de Dedo Clássico", preco: "25,50", tag: "praia dedo", img: "https://images.tcdn.com.br/img/img_prod/629144/chinelo_havaianas_slim_gloss_bordo_84063_3124_2_38b77669b8c0f60565697e4749d72f9b.png" },
    { nome: "Chinelo Nuvem Bege", preco: "59,90", tag: "nuvem conforto", img: "https://m.media-amazon.com/images/I/31BaKfHOUHL._AC_SY300_.jpg" },
    { nome: "Chinelo Ortopédico", preco: "89,90", tag: "ortopedico saude", img: "https://images.tcdn.com.br/img/img_prod/1420119/chinelo_ortopedico_feminino_ajustavel_e_confortavel_25_5_f97f5a3348dfafd38105d4c4565afc0a.jpeg" },
    { nome: "Sandália Chinelo Couro", preco: "120,00", tag: "couro luxo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1s4stSQoDlHS6-AdIdonmckbXeuB5v8kTDQ&s" }
];

function renderizarProdutos(lista) {
    const vitrine = document.getElementById('vitrine');
    if (!vitrine) return;

    vitrine.innerHTML = '';

    if (lista.length === 0) {
        vitrine.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; color: var(--bordo); padding: 2rem;">Nenhum produto encontrado com essa busca.</p>';
        return;
    }

    lista.forEach(produto => {
        const srcImagem = produto.img ? produto.img : 'https://via.placeholder.com/300x200.png?text=Sem+Foto';

        const card = `
            <div class="card-produto fade-in">
                <img src="${srcImagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco}</p>
                <button class="btn-comprar" onclick="adicionarAoCarrinho('${produto.nome}')">Comprar</button>
            </div>
        `;
        vitrine.innerHTML += card;
    });
}

function buscarProdutos() {
    const inputBusca = document.getElementById('input-busca');
    if (!inputBusca) return;
    const termo = inputBusca.value.toLowerCase();

    const produtosFiltrados = produtos.filter(prod =>
        prod.nome.toLowerCase().includes(termo) ||
        prod.tag.toLowerCase().includes(termo)
    );

    renderizarProdutos(produtosFiltrados);
}

function adicionarAoCarrinho(nomeProduto) {
    alert(`"${nomeProduto}" adicionado ao carrinho! (funcionalidade em breve)`);
}

let modoRegistro = false;

function alternarModoAuth() {
    modoRegistro = !modoRegistro;
    const nomeInput = document.getElementById('nome');
    const confirmaSenhaInput = document.getElementById('confirma-senha');
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-btn');
    const toggleTexto = document.getElementById('toggle-texto');
    const msg = document.getElementById('mensagem');

    msg.style.display = "none";
    document.getElementById('auth-form').reset();

    if (modoRegistro) {
        nomeInput.style.display = 'block';
        nomeInput.required = true;
        confirmaSenhaInput.style.display = 'block';
        confirmaSenhaInput.required = true;
        title.innerText = 'Crie sua Conta';
        btn.innerText = 'Registrar';
        toggleTexto.innerHTML = 'Já tem uma conta? <span onclick="alternarModoAuth()">Faça Login</span>';
    } else {
        nomeInput.style.display = 'none';
        nomeInput.required = false;
        confirmaSenhaInput.style.display = 'none';
        confirmaSenhaInput.required = false;
        title.innerText = 'Acesse sua Conta';
        btn.innerText = 'Entrar';
        toggleTexto.innerHTML = 'Não tem uma conta? <span onclick="alternarModoAuth()">Registre-se</span>';
    }
}

function lidarComAuth(evento) {
    evento.preventDefault();

    const msg = document.getElementById('mensagem');
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        msg.textContent = "Por favor, insira um formato de e-mail válido!";
        msg.className = "msg error";
        msg.style.display = "block";
        return;
    }

    if (modoRegistro) {
        const nome = document.getElementById('nome').value.trim();
        const confirmaSenha = document.getElementById('confirma-senha').value.trim();

        if (!nome) {
            msg.textContent = "Por favor, insira seu nome completo!";
            msg.className = "msg error"; msg.style.display = "block"; return;
        }

        if (senha.length < 6) {
            msg.textContent = "A senha deve ter pelo menos 6 caracteres!";
            msg.className = "msg error"; msg.style.display = "block"; return;
        }

        if (senha !== confirmaSenha) {
            msg.textContent = "As senhas não coincidem!";
            msg.className = "msg error"; msg.style.display = "block"; return;
        }

        const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];
        const existe = usuariosDB.find(u => u.email === email);

        if (existe) {
            msg.textContent = "Este e-mail já está cadastrado!";
            msg.className = "msg error"; msg.style.display = "block"; return;
        }

        usuariosDB.push({ nome, email, senha });
        localStorage.setItem('usuarios', JSON.stringify(usuariosDB));

        msg.textContent = "Cadastro realizado com sucesso! Faça login.";
        msg.className = "msg success"; msg.style.display = "block";
        document.getElementById('auth-form').reset();
        setTimeout(alternarModoAuth, 2000);

    } else {
        let tentativas = parseInt(localStorage.getItem(`bloqueio_${email}`)) || 0;

        if (tentativas >= 3) {
            msg.textContent = "Sua conta foi bloqueada após 3 tentativas falhas. Contate o suporte.";
            msg.className = "msg error"; msg.style.display = "block"; return;
        }

        const usuariosDB = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuariosDB.find(u => u.email === email && u.senha === senha);

        if (usuarioValido) {
            localStorage.removeItem(`bloqueio_${email}`);
            msg.textContent = `Bem-vindo de volta, ${usuarioValido.nome}!`;
            msg.className = "msg success"; msg.style.display = "block";
            localStorage.setItem('usuarioLogado', usuarioValido.nome);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            tentativas++;
            localStorage.setItem(`bloqueio_${email}`, tentativas);

            if (tentativas >= 3) {
                msg.textContent = "Conta bloqueada por excesso de tentativas! Contate o suporte.";
            } else {
                msg.textContent = `E-mail ou senha incorretos! (${tentativas}/3 tentativas)`;
            }
            msg.className = "msg error"; msg.style.display = "block";
        }
    }
}

function checarLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const navLogin = document.getElementById('nav-login');

    if (!navLogin) return;

    if (usuarioLogado) {
        const primeiroNome = usuarioLogado.split(' ')[0];
        navLogin.innerText = `Sair (${primeiroNome})`;
        navLogin.href = "#";
        navLogin.classList.add('nav-logout');
        navLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm(`Deseja sair da conta de ${primeiroNome}?`)) {
                localStorage.removeItem('usuarioLogado');
                window.location.href = "login.html";
            }
        });
    } else {
        navLogin.innerText = "Login";
        navLogin.href = "login.html";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarSlider();
    renderizarProdutos(produtos);
    checarLogin();

    const inputBusca = document.getElementById('input-busca');
    if (inputBusca) {
        inputBusca.addEventListener('input', buscarProdutos);
    }

    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', lidarComAuth);
    }
});
