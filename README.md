# Weather App

Dashboard de previsão do tempo desenvolvido com React, TypeScript e Vite. O aplicativo usa a localização do navegador para exibir as condições meteorológicas atuais, a temperatura por hora e a previsão dos próximos dias.

## Funcionalidades

- Detecção da localização atual pelo navegador.
- Clima atual, incluindo temperatura, umidade e vento.
- Temperatura horária.
- Previsão para até 5 dias.
- Busca de localidades usando a API de geocodificação da OpenWeather.
- Histórico das últimas 10 buscas salvo no navegador.
- Atualização manual dos dados meteorológicos.
- Tema claro e escuro.
- Estados de carregamento e mensagens de erro para localização e requisições.

## Tecnologias

- React 19 e TypeScript
- Vite
- React Router
- TanStack React Query
- Tailwind CSS
- Lucide React
- OpenWeather Current Weather, Forecast e Geocoding APIs

## Pré-requisitos

- Node.js 20 ou superior
- npm
- Uma chave de API da [OpenWeather](https://openweathermap.org/api)

## Instalação

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_OPENWEATHER_API_KEY=sua_chave_da_openweather
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   Abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload. |
| `npm run build` | Executa a verificação TypeScript e gera a versão de produção. |
| `npm run lint` | Executa o Oxlint. |
| `npm run preview` | Serve localmente o build de produção. |

## Estrutura principal

```text
src/
├── api/              # Configuração, tipos e chamadas à OpenWeather
├── components/       # Componentes reutilizáveis e componentes de interface
├── context/          # Provider de tema
├── hooks/            # Geolocalização, persistência e queries de clima
├── pages/            # Dashboard e páginas roteadas
├── App.tsx           # Providers e configuração das rotas
└── main.tsx          # Ponto de entrada da aplicação
```

## Rotas

- `/`: dashboard meteorológico da localização atual.
- `/city/:cityName`: rota reservada para a visualização de uma cidade específica.

> A visualização da rota de cidade ainda está em desenvolvimento; atualmente ela exibe apenas um placeholder.

## Observações

- A permissão de localização deve ser concedida no navegador para carregar o dashboard inicial.
- A chave da OpenWeather é exposta no bundle do frontend por ser uma variável `VITE_`. Para produção, avalie usar um backend ou proxy para proteger credenciais e controlar o acesso à API.
- O histórico de buscas é armazenado localmente com a chave `search-history`.
- Você pode acessar o conteúdo de suporte utilizado para esse projeto [aqui](https://youtu.be/BCp_5PoKrvI?si=RGBnS6NQvX3roovi)
