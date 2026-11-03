let categoria_atual="todos"
let carrinho=[]

let produtos=[
    {id:1,nome:"Whey Protein Concentrado 900g",categoria:"whey",preco:119.9,favorito:false,imagem:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRZRB-XmS942TaUjrisaNaiLTCkEo5uy5S7zHzoG5wt6cEXlb6JIcbubIM0ezOFPgbvwQXl-ebjqy_RBOfsQdfx-LF7zUVVUtC9lnehTrJYqFFkS9PciZ9JBZmLyyiCj4-jEDcn5w&usqp=CAc/400x400"},
    {id:2,nome:"Whey Protein Isolado 900g",categoria:"whey",preco:189.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbb49VbFQlBZ-lzXQzhwfmChDbP6nUvvH-ZVuYMK_ZVw&s=10/400x400"},
    {id:3,nome:"Whey Protein Hidrolisado 900g",categoria:"whey",preco:229.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmRyksjabVTXyaf-qSa3wftW1qGSoYDAZ0NxEZKlsSPw&s=10/400x400"},
    {id:4,nome:"Creatina Monohidratada 300g",categoria:"creatina",preco:89.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhO2GItj4hK6kok6FWqQ7Jf5kESqpUxVbfd3suSoqvPQ&s=10/400x400"},
    {id:5,nome:"Creatina Creapure 250g",categoria:"creatina",preco:139.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZHqh0IrwS7FQxBA1IgRBAQgKHjhT0si5Uwu8jsRQ5A&s=10/400x400"},
    {id:6,nome:"Albumina 500g",categoria:"proteinas",preco:59.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5Zd4wFi4OinOHnmkjIm_YSehxLrQPbDDKnmG6xzG8g&s=10/400x400"},
    {id:7,nome:"Proteina Vegetal 600g",categoria:"proteinas",preco:99.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRCLfE03962fT7aYKfAwYj-aacjr4Kb-APUkcrJp3Qg&s/400x400"},
    {id:8,nome:"Caseina Micelar 900g",categoria:"proteinas",preco:149.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFZGbejh5Is7hTaksL11Xus1Yq5ObE_eIB8X24r7q9g&s/400x400"},
    {id:9,nome:"Pre-treino 300g",categoria:"outros",preco:99.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB4D_YMtDe3dmsLs4A6gltENvKWTmtvqV5NglQMtQWrQ&s/400x400"},
    {id:10,nome:"BCAA 120 capsulas",categoria:"outros",preco:69.9,favorito:false,imagem:"https://pensefarma.vtexassets.com/arquivos/ids/177589/Bcaa_Integralmedica_Top_com_120_Capsulas.png?v=637850256549830000/400x400"},
    {id:11,nome:"Multivitaminico 60 capsulas",categoria:"outros",preco:49.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4Y6E2f2KT_EeDy9sdVLt4CIuph_76b3CIGLB1CC1-w&s/400x400"},
    {id:12,nome:"Coqueteleira 600ml",categoria:"outros",preco:29.9,favorito:false,imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJj0j-j260xEE9RsuoGtweQ74W84idARmSbPrAyf20EQ&s=10/400x400"}
]

function mostrar_aviso(texto){
    let aviso=document.getElementById("aviso")
    aviso.textContent=texto
    aviso.classList.add("visivel")
    clearTimeout(aviso.temporizador)
    aviso.temporizador=setTimeout(function(){
        aviso.classList.remove("visivel")
    },3500)
}

function mostrar_produtos(){
    let texto=document.getElementById("busca").value.toLowerCase().trim()
    let lista=document.getElementById("lista_produtos")

    let achados=produtos.filter(function(produto){
        let na_categoria=categoria_atual=="todos" || produto.categoria==categoria_atual || (categoria_atual=="favoritos" && produto.favorito)
        return na_categoria && produto.nome.toLowerCase().includes(texto)
    })

    lista.innerHTML=""
    achados.forEach(function(produto){
        let classe="favorito"
        let icone="bi-suit-heart"
        if(produto.favorito){
            classe="favorito ativo"
            icone="bi-suit-heart-fill"
        }

        lista.innerHTML+=`
        <div class="produto">
            <button class="${classe}" onclick="favoritar(${produto.id})"><i class="bi ${icone}"></i></button>
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace(".",",")}</p>
            <button onclick="adicionar(${produto.id})"><i class="bi bi-cart-plus"></i> Adicionar</button>
        </div>`
    })

    if(achados.length==0){
        if(categoria_atual=="favoritos"){
            lista.innerHTML='<p class="vazio">Você ainda não tem favoritos</p>'
        }else{
            lista.innerHTML='<p class="vazio">Nenhum produto encontrado</p>'
        }
    }

    if(categoria_atual=="favoritos"){
        document.querySelector("#produtos h2").textContent="Favoritos"
    }else{
        document.querySelector("#produtos h2").textContent="Produtos"
    }

    document.getElementById("contagem").textContent=achados.length+" produto(s) encontrado(s)"
}

function filtrar(categoria,botao){
    categoria_atual=categoria
    document.querySelectorAll("#botoes button").forEach(function(b){
        b.classList.remove("ativo")
    })
    botao.classList.add("ativo")
    mostrar_produtos()
}

function ver_favoritos(){
    categoria_atual="favoritos"
    document.querySelectorAll("#botoes button").forEach(function(b){
        b.classList.remove("ativo")
    })
    mostrar_produtos()
}

function favoritar(id){
    let produto=produtos.find(function(p){
        return p.id==id
    })
    produto.favorito=!produto.favorito

    if(produto.favorito){
        mostrar_aviso("Adicionado aos favoritos")
    }else{
        mostrar_aviso("Removido dos favoritos")
    }

    mostrar_produtos()
}

function adicionar(id){
    let item=carrinho.find(function(i){
        return i.id==id
    })

    if(item){
        item.qtd++
    }else{
        let produto=produtos.find(function(p){
            return p.id==id
        })
        carrinho.push({id:produto.id,nome:produto.nome,preco:produto.preco,qtd:1})
    }

    desenhar_carrinho()
    mostrar_aviso("Produto adicionado ao carrinho")
}

function alterar_qtd(id,mudanca){
    let item=carrinho.find(function(i){
        return i.id==id
    })
    item.qtd+=mudanca

    if(item.qtd<=0){
        carrinho=carrinho.filter(function(i){
            return i.id!=id
        })
    }

    desenhar_carrinho()
}

function desenhar_carrinho(){
    let area=document.getElementById("itens_carrinho")
    let total=0
    area.innerHTML=""

    carrinho.forEach(function(item){
        total+=item.preco*item.qtd
        area.innerHTML+=`
        <div class="item">
            <div>
                ${item.nome}
                <span>R$ ${item.preco.toFixed(2).replace(".",",")}</span>
            </div>
            <div class="quantidade">
                <i class="bi bi-dash-circle" onclick="alterar_qtd(${item.id},-1)"></i>
                ${item.qtd}
                <i class="bi bi-plus-circle" onclick="alterar_qtd(${item.id},1)"></i>
            </div>
        </div>`
    })

    if(carrinho.length==0){
        area.innerHTML='<p class="vazio">Seu carrinho está vazio</p>'
    }

    document.getElementById("total").textContent="R$ "+total.toFixed(2).replace(".",",")
}

function abrir_carrinho(){
    document.getElementById("carrinho").classList.add("aberto")
}

function fechar_carrinho(){
    document.getElementById("carrinho").classList.remove("aberto")
}

function finalizar(){
    if(carrinho.length==0){
        mostrar_aviso("Seu carrinho está vazio")
        return
    }

    fechar_carrinho()
    abrir_modal(`
        <h2>Finalizar compra</h2>
        <p>Esta é uma compra simulada. Nenhum dado de pagamento é coletado ou armazenado.</p>
        <p>Em uma loja real, usaríamos apenas os dados necessários para pagamento e entrega (princípio da minimização, LGPD art. 6º).</p>
        <button onclick="concluir()">Confirmar pedido</button>`)
}

function concluir(){
    carrinho=[]
    desenhar_carrinho()
    fechar_modal()
    mostrar_aviso("Pedido simulado concluído")
}

function abrir_modal(conteudo){
    document.getElementById("modal_conteudo").innerHTML=conteudo
    document.getElementById("fundo").classList.add("aberto")
}

function fechar_modal(){
    document.getElementById("fundo").classList.remove("aberto")
}

function abrir_conta(){
    abrir_modal(`
        <h2>Criar conta</h2>
        <form onsubmit="enviar_cadastro(event)" autocomplete="off">
            <label>Nome completo
                <input type="text" id="cad_nome" maxlength="80">
            </label>
            <label>E-mail
                <input type="email" id="cad_email" maxlength="80">
            </label>
            <label>Senha
                <input type="password" id="cad_senha" maxlength="64">
            </label>
            <label class="check">
                <input type="checkbox" id="cad_consentimento">
                <span>Li e concordo com a <a onclick="abrir_privacidade()">Política de Privacidade</a> e autorizo o tratamento dos meus dados pessoais para cadastro, compra e entrega.</span>
            </label>
            <label class="check">
                <input type="checkbox" id="cad_marketing">
                <span>Desejo receber ofertas por e-mail (opcional)</span>
            </label>
            <p id="msg_cadastro"></p>
            <button type="submit">Cadastrar</button>
        </form>`)
}

function enviar_cadastro(evento){
    evento.preventDefault()
    let nome=document.getElementById("cad_nome").value.trim()
    let email=document.getElementById("cad_email").value.trim()
    let senha=document.getElementById("cad_senha").value
    let mensagem=document.getElementById("msg_cadastro")

    if(nome.length<3){
        mensagem.textContent="Informe seu nome completo."
        return
    }

    if(!email.includes("@") || !email.includes(".")){
        mensagem.textContent="Informe um e-mail válido."
        return
    }

    if(senha.length<8){
        mensagem.textContent="A senha precisa ter pelo menos 8 caracteres."
        return
    }

    if(!document.getElementById("cad_consentimento").checked){
        mensagem.textContent="É necessário consentir com o tratamento de dados para criar a conta."
        return
    }

    abrir_modal(`
        <h2>Conta criada</h2>
        <p>Cadastro simulado concluído. Em um site real, sua senha seria armazenada com hash e seu consentimento seria registrado com data e hora.</p>
        <button onclick="fechar_modal()">Fechar</button>`)
}

function salvar_consentimento(desempenho,marketing){
    document.getElementById("banner").classList.remove("visivel")
    fechar_modal()
    mostrar_aviso("Suas preferências de privacidade foram salvas")
}

function abrir_cookies(){
    abrir_modal(`
        <h2>Preferências de cookies</h2>
        <form onsubmit="return false">
            <label class="check">
                <input type="checkbox" checked disabled>
                <span>Necessários: mantêm o carrinho e a segurança do site (sempre ativos)</span>
            </label>
            <label class="check">
                <input type="checkbox" id="ck_desempenho">
                <span>Desempenho: ajudam a entender como o site é usado</span>
            </label>
            <label class="check">
                <input type="checkbox" id="ck_marketing">
                <span>Marketing: ofertas e anúncios personalizados</span>
            </label>
            <button onclick="salvar_personalizado()">Salvar preferências</button>
        </form>`)
}

function salvar_personalizado(){
    salvar_consentimento(
        document.getElementById("ck_desempenho").checked,
        document.getElementById("ck_marketing").checked
    )
}

function abrir_privacidade(){
    abrir_modal(`
        <h2>Política de Privacidade</h2>
        <p>Texto ilustrativo, criado para fins acadêmicos.</p>
        <ul>
            <li><strong>Dados coletados:</strong> nome, e-mail, endereço de entrega e histórico de compras.</li>
            <li><strong>Finalidade:</strong> cadastro, processamento de pedidos, entrega e atendimento.</li>
            <li><strong>Base legal:</strong> execução de contrato e consentimento (LGPD art. 7º).</li>
            <li><strong>Compartilhamento:</strong> apenas com transportadoras e meios de pagamento necessários à compra.</li>
            <li><strong>Retenção:</strong> os dados são mantidos pelo tempo necessário à finalidade ou a obrigações legais.</li>
            <li><strong>Seus direitos:</strong> acesso, correção, eliminação, portabilidade e revogação do consentimento.</li>
            <li><strong>Encarregado (DPO):</strong> privacidade@realsupli.com.br</li>
        </ul>`)
}

function abrir_direitos(){
    let direitos=[
        "Confirmação da existência de tratamento",
        "Acesso aos meus dados",
        "Correção de dados incompletos ou desatualizados",
        "Anonimização, bloqueio ou eliminação",
        "Portabilidade dos dados",
        "Revogação do consentimento"
    ]
    let lista=""

    direitos.forEach(function(direito){
        lista+=`
        <div class="direito">
            <span>${direito}</span>
            <button onclick="solicitar_direito()">Solicitar</button>
        </div>`
    })

    abrir_modal(`
        <h2>Direitos do titular</h2>
        <p>Conforme o art. 18 da LGPD, você pode solicitar:</p>
        ${lista}`)
}

function solicitar_direito(){
    mostrar_aviso("Solicitação registrada (simulação). Protocolo: LGPD-"+Date.now())
}

function abrir_seguranca(){
    abrir_modal(`
        <h2>Segurança da informação</h2>
        <p>Medidas descritas de forma ilustrativa:</p>
        <ul>
            <li>Conexão protegida por HTTPS/TLS.</li>
            <li>Senhas armazenadas com hash, nunca em texto puro.</li>
            <li>Validação dos campos dos formulários.</li>
            <li>Acesso interno aos dados limitado por perfil e registrado em log.</li>
            <li>Dados de cartão não são armazenados: o pagamento é feito por um gateway certificado (PCI DSS).</li>
            <li>Plano de resposta a incidentes com comunicação à ANPD e aos titulares.</li>
        </ul>`)
}

document.getElementById("fundo").addEventListener("click",function(evento){
    if(evento.target==this){
        fechar_modal()
    }
})

document.addEventListener("keydown",function(evento){
    if(evento.key=="Escape"){
        fechar_modal()
        fechar_carrinho()
    }
})

mostrar_produtos()
desenhar_carrinho()

document.getElementById("banner").classList.add("visivel")