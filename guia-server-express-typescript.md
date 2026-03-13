# Passo a Passo - Server com Express e TypeScript

## 1. Objetivo
Montar o servidor por partes.

Nesta primeira etapa, a ideia e instalar e configurar apenas o necessario para:
- subir um servidor Express com TypeScript
- organizar a base da arquitetura
- deixar o projeto pronto para crescer depois

Nesta fase, ainda nao vamos instalar banco, Prisma, Zod ou outras camadas que nao sejam essenciais para o Express funcionar.

---

## 2. O que entra nesta primeira fase

Dependencias realmente necessarias agora:
- Node.js 20+
- Express
- TypeScript
- tsx
- @types/node
- @types/express

Opcional para a proxima etapa:
- cors
- dotenv
- zod
- prisma
- @prisma/client
- helmet
- logger

---

## 3. Estrutura inicial recomendada

```txt
server/
  package.json
  tsconfig.json
  src/
    server.ts
    app.ts
    routes/
      index.ts
    controllers/
    services/
    repositories/
```

Observacao:
- `controllers`, `services` e `repositories` podem existir vazios desde o inicio
- isso ajuda a manter a arquitetura organizada desde a base
- mesmo sem banco agora, vale deixar a estrutura pronta

---

## 4. Inicializar o projeto

Se voce ja rodou `npm init -y`, pode seguir daqui.

Comandos:

```bash
npm i express
npm i -D typescript tsx @types/node @types/express
```

Nesta etapa, nao instale mais nada.

---

## 5. Configurar o TypeScript

Crie o arquivo `tsconfig.json` na raiz do server:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

Essa configuracao ja e suficiente para desenvolver e gerar build.

---

## 6. Configurar os scripts

No `package.json`, deixe os scripts assim:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

O que cada um faz:
- `dev`: roda o servidor em desenvolvimento com reload
- `build`: compila TypeScript para JavaScript
- `start`: executa a build compilada

---

## 7. Criar a estrutura de pastas

Crie as pastas:

```txt
src/
  routes/
  controllers/
  services/
  repositories/
```

Mesmo que algumas ainda nao sejam usadas, isso prepara a arquitetura modular.

---

## 8. Criar o app Express

Crie `src/app.ts`:

```ts
import express from 'express';
import { router } from './routes';

export const app = express();

app.use(express.json());
app.use('/api', router);
```

Responsabilidade desse arquivo:
- criar a aplicacao Express
- registrar middlewares globais
- registrar rotas principais

---

## 9. Criar o ponto de entrada do servidor

Crie `src/server.ts`:

```ts
import { app } from './app';

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Responsabilidade desse arquivo:
- apenas subir o servidor
- evitar misturar inicializacao com configuracao do app

---

## 10. Criar a rota inicial

Crie `src/routes/index.ts`:

```ts
import { Router } from 'express';

export const router = Router();

router.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Server is running',
  });
});
```

Essa rota serve para validar que o servidor esta funcionando.

URL de teste:
- `GET /api/health`

---

## 11. Proximos passos imediatos

Agora que voce concluiu ate o passo 10, siga nesta ordem:

1. Criar a logica no formulario para o select de cidade aparecer somente depois de escolher o estado.
2. Receber os dados do formulario no backend e salvar 1 apoio por envio.

---

## 12. Passo 11 (Aula guiada) - Formulario dependente Estado -> Cidade

Meta de aprendizado:
- Entender como um campo depende do outro no frontend.

### 12.1 O que voce vai fazer
1. Garantir que existe select de `estado` e select de `cidade`.
2. Comecar com `cidade` desabilitado.
3. Ao escolher `estado`, preencher `cidade` com as opcoes validas.
4. Se trocar o `estado`, limpar a cidade antiga.

### 12.2 Faca agora (HTML)
No formulario, deixe ids claros para facilitar o JavaScript:

```html
<select id="estado-select" required>
  <option value="">Selecione seu estado</option>
  <option value="Rio de Janeiro">Rio de Janeiro</option>
</select>

<select id="cidade-select" required disabled>
  <option value="">Selecione primeiro o estado</option>
</select>
```

### 12.3 Faca agora (JS)
Use esta base de logica no script da pagina:

```javascript
const estadoSelect = document.getElementById('estado-select');
const cidadeSelect = document.getElementById('cidade-select');

function resetCidade() {
  cidadeSelect.innerHTML = '<option value="">Selecione primeiro o estado</option>';
  cidadeSelect.disabled = true;
}

function preencherCidades(cidades) {
  cidadeSelect.innerHTML = '<option value="">Selecione sua cidade</option>';

  cidades.forEach((cidade) => {
    const option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    cidadeSelect.appendChild(option);
  });

  cidadeSelect.disabled = false;
}

estadoSelect.addEventListener('change', () => {
  const estado = estadoSelect.value;

  if (!estado) {
    resetCidade();
    return;
  }

  // Exemplo para JSON local com um unico estado:
  // cidadesData deve vir do fetch do seu arquivo cidades-rj.json
  const cidades = Object.keys(cidadesData || {});

  if (!cidades.length) {
    resetCidade();
    return;
  }

  preencherCidades(cidades);
});
```

### 12.4 Como validar se deu certo
1. Recarregue a pagina: `cidade` deve iniciar desabilitado.
2. Escolha `estado`: `cidade` deve habilitar e listar opcoes.
3. Troque o estado para vazio: `cidade` deve limpar e desabilitar.

Se esses 3 testes passarem, o passo 11 esta concluido.

---

## 13. Passo 12 (Aula guiada) - Receber os dados do formulario no backend

Meta de aprendizado:
- Entender o fluxo completo: frontend envia JSON e backend valida + responde.

### 13.1 O que voce vai fazer
1. Criar `POST /api/supports`.
2. Validar campos obrigatorios.
3. Montar objeto `support` com `id` e `createdAt`.
4. Responder `201` em sucesso e `400` em erro de validacao.

### 13.2 Faca agora (backend)
No arquivo `server/src/routes/index.ts`, adicione:

```ts
router.post('/supports', (req, res) => {
  const { fullName, email, state, city, message } = req.body;

  if (!fullName || !email || !state || !city || !message) {
    return res.status(400).json({
      status: 'error',
      message: 'Campos obrigatorios ausentes',
    });
  }

  const support = {
    id: Date.now().toString(),
    fullName,
    email,
    state,
    city,
    message,
    createdAt: new Date().toISOString(),
  };

  return res.status(201).json({
    status: 'created',
    support,
  });
});
```

### 13.3 Faca agora (frontend submit)
No submit do formulario, envie para o backend:

```javascript
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    fullName: nomeInput.value,
    email: emailInput.value,
    state: estadoSelect.value,
    city: cidadeSelect.value,
    message: mensagemInput.value,
  };

  const response = await fetch('http://localhost:3333/api/supports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    alert('Erro ao enviar apoio. Verifique os campos.');
    return;
  }

  alert('Apoio enviado com sucesso.');
  form.reset();
  resetCidade();
});
```

### 13.4 Como validar se deu certo
1. Rode o backend com `npm run dev` dentro de `server`.
2. Preencha o formulario e envie.
3. Verifique no Network do navegador: `POST /api/supports` com status `201`.
4. Teste com campo faltando: deve retornar `400`.

Se esses 4 testes passarem, o passo 12 esta concluido.

---

## 14. Ordem de execucao recomendada (pratica)

1. Ajuste ids e `disabled` dos selects no HTML.
2. Implemente a logica `estado -> cidade` no script da pagina.
3. Crie `POST /api/supports` no backend.
4. Conecte o submit do formulario ao endpoint.
5. Execute os testes de validacao listados acima.

---

## 15. Checklist de conclusao desta fase

Marque cada item quando terminar:
- [ ] Cidade inicia desabilitada
- [ ] Cidade so habilita apos estado
- [ ] Troca de estado limpa cidade
- [ ] `POST /api/supports` responde `201` quando valido
- [ ] `POST /api/supports` responde `400` com campo faltando
- [ ] Submit do frontend envia payload correto

Quando todos estiverem marcados, voce concluiu os proximos passos com base solida.
