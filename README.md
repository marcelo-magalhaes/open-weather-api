# Projeto de frontend para API OpenWeather

## Baixando o projeto

Para baixar o projeto, você pode fazer o download através de um arquivo zip, que é encontrado no botão verde escrito clone or download, ou ainda clonar o repositório.

Para clona-lo, clique no mesmo botão verde e copie o link presente na janela que apareceu, agora abra uma sessão do terminal no seu computador e digite:

$git clone git@github.com:mallssa/open-weather-api.git

Na sequência, mude para o diretório do projeto, usando:

cd open-weather-api

## Configuração do ambiente

O framework usado para desenvolver o frontend foi o ReactJs

Na pasta raiz do projeto, digite:

npm install

E o próprio npm irá instalar todas dependências

## Executando o projeto

Para executar o projeto, é necessário de uma chave de API fornecida pela OpenWeather.

O link para acessar o site e se cadastrar é esse: https://openweathermap.org/api

Após conseguir a chave da api, é necessário criar um arquivo dentro da pasta src, chamado env.js com o seguinte código:

const CHAVE_API = ###AQUI VAI A SUA CHAVE;

export default CHAVE_API;

Por fim, basta abrir o terminal na pasta raiz do projeto e executar:

npm start ou yarn start

