import React, {useState} from 'react';
import './App.css';
import api from './services/api';
import CHAVE_API from './env';


function App() {
  const [name,setName] = useState('');
  const [city,setCity] = useState('');
  const [temperatura,setTemperatura] = useState('');
  const [clima,setClima] = useState('');
  const [maxima,setMaxima] = useState('');
  const [minima,setMinima] = useState('');
  const [humidade,setHumidade] = useState('');
  const [pais,setPais] = useState('');
  const [ultimasPesquisas,setUltimasPesquisas] = useState([]);
  const [maisPesquisadas,setMaisPesquisada] = useState([]);
  

  function converteTemperatura(value){
    return (value-273.15).toFixed(2);
  }

  function verificaUltimasPesquisas(){
    
    if(ultimasPesquisas.length === 5){
      const temp = ultimasPesquisas[0];
      setUltimasPesquisas([...ultimasPesquisas.filter(e => (e!==temp)),city]);

    }
    else{
      const temp = ultimasPesquisas;
      let verificaCidade = false;
      temp.forEach(cidade => {
        if(cidade === city){
          verificaCidade = true;
        }
      })
      if(!verificaCidade){
        temp.push(city);
        setUltimasPesquisas(temp)
      }
      
      
    }
  }

  function RankingMaisPesquisadas(){
    let verifica = true
    maisPesquisadas.map(cidade => {
      if(cidade[1]===city){
        cidade[0]++;
        verifica = false;
      }
    })
    const temp = maisPesquisadas;

    if(verifica){
      temp.push([0,city]);
    }
      
    setMaisPesquisada(temp.sort().reverse());
  }

  async function handleEvent(e){
    e.preventDefault();
    if(name!==''){
      try{
        await api.get(`weather?q=${name}&appid=${CHAVE_API}&lang=pt_br`)
        .then(response => {
          console.log(response.data);
          setCity(response.data.name);
          setTemperatura([converteTemperatura(response.data.main.temp),'ºC']);
          setClima(response.data.weather[0].description);
          setMaxima(['Maxima: ',converteTemperatura(response.data.main.temp_max)]);
          setMinima(['Minima: ',converteTemperatura(response.data.main.temp_min)]);
          setHumidade(['Umidade: ',response.data.main.humidity,'%']);
          setPais(response.data.sys.country);
          verificaUltimasPesquisas();
          RankingMaisPesquisadas();
          console.log(maisPesquisadas);
          setName('')
        })
      }catch{
        alert("Erro ao pesquisar cidade, verifique se a escrita está correta!");
        setName('');
      }
    }

  }
  

  return (
    
    <div className="App">
      
      <div className="container">
          <h2>Open Weather API</h2>
          <p>Seja bem-vindo ao teste de API da OpenWeather!</p>
          <p>Para testar, basta escrever o nome da cidade no input abaixo. Por exemplo: Rio de Janeiro</p>
          <div className="conteudo">
             
            <div className="formulario">
                <form onSubmit={handleEvent}>
                  <input 
                    value = {name}
                    onChange={e => {setName(e.target.value)}}
                    placeholder = "Nome da cidade"
                    />
                  <button type="submit">Pesquisar</button>
                </form>
                <div className="retorno">
                  <label className="temperatura">{temperatura}</label>
                  <div className="infos primarias">
                    <label>{clima}</label>
                    <label> {city}</label>
                    <label>{pais}</label>
                  </div>
                  <div className="infos secundarias">
                    <label>{maxima}</label>
                    <label>{minima}</label>
                    <label>{humidade}</label>
                  </div>
                </div>
            </div>
            <div className="search">
              <div className="ultimas-pesq">
                <h2>Últimas pesquisas</h2>
                <ul>
                  {ultimasPesquisas.map(pesquisas => (
                    <li>
                      {pesquisas} 
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mais-pesquisadas">
                <h2>Cidades mais pesquisadas</h2>
                <ul>
                {maisPesquisadas.slice(0,5).map(cidade => (
                  <li>
                    {cidade[1]}
                  </li>
                ))}    
                </ul>  
              </div>  
            </div>
          </div>
      </div>
    </div>
    
  );
}

export default App;
