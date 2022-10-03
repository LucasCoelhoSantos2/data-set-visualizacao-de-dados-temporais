import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import _ from "lodash";
import dataset from "./data/stargazers_amzn-style-dictionary.json";
import "./App.css";
//import { Historico } from './interfaces';

const AGRUPAMENTO = ["dia", "semana", "mes", "ano"];
const ESCALA = ["linear", "logaritimica"];

function App() {
  const [agrupamento, setAgrupamento] = useState(AGRUPAMENTO[0]);
  const [escala, setEscala] = useState(ESCALA[0]);

  const handleChangeAgrupamento = (event) => setAgrupamento(event.target.value);
  const handleChangeEscala = (event) => setEscala(event.target.value);

  const transformedDataset = dataset.map((data) => {
    data.starred_at = new Date(data.starred_at);
    data.dia = data.starred_at.getDate();
    data.semana = data.starred_at.getDay();
    data.mes = data.starred_at.getMonth();
    data.ano = data.starred_at.getFullYear();
    return data;
  });
  
  function valorQuantidade() {
    //TO DO: função que pega o valor do select option para poder usar como parâmetro no LineChart
  }
  
  const quantidadeDia = _.countBy(
    transformedDataset,
    (record) => `${record.ano}-${record.mes}-${record.dia}`
  );
  const quantidadeSemana = _.countBy(
    transformedDataset,
    (record) => `${record.semana}`
  );
  const quantidadeMes = _.countBy(
    transformedDataset,
    (record) => `${record.ano}-${record.mes}`
  );
  const quantidadeAno = _.countBy(transformedDataset, "ano");
  
  function quantidadeData(quantidade) {
    const quantiadadeFinal = Object.entries(quantidade).map((dado) => {
      return {
        'Data': dado[0],
        'Quantidade': dado[1]
      }
    });
    return quantiadadeFinal
  }

  return (
    //TO DO: trocar o parâmetro quantidadeDia para o valor do select option depois de terminar a função quantidade
    <div>
      <h1>Componente para visualização de dados temporais de estrelas</h1>

      <div className="line-chart">
        <LineChart width={1080} height={500} data={quantidadeData(quantidadeDia)}>
          <Line type="monotone" dataKey="Quantidade" />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="Data" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      <div className="container">
        <div className="selector">
          <label for="agrupamento_select" className="label">
            <strong>Agrupamento: </strong>
          </label>
          <select id="agrupamento_select" onChange={handleChangeAgrupamento}>
            {AGRUPAMENTO.map((s) => (
              <option key={s} value={s}>
                por {s}
              </option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label for="escala_select" className="label">
            <strong>Escala: </strong>
          </label>
          <select onChange={handleChangeEscala}>
            {ESCALA.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
