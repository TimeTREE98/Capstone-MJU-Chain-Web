import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import networkgraph from 'highcharts/modules/networkgraph';
networkgraph(Highcharts);

const App = () => {
  // chart 실시간 업데이트 처리 위한 state 변수 선언
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'networkgraph',
      height: 1000,
    },
    title: {
      text: 'Block Node Example',
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: { enableSimulation: true, integration: 'verlet', approximation: 'barnes-hut', gravitationalConstant: 0.8 },
      },
    },
    series: [
      {
        dataLabels: {
          enabled: true,
          linkFormat: '',
        },
        id: 'node-tree',
        data: [
          ['A', 'B'],
          ['A', 'C'],
        ],
      },
    ],
  });

  const ramdomAlphabet = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return possible.charAt(Math.floor(Math.random() * possible.length));
  };

  // 존재하는 노드인지 검증, 없는 노드면 맞을때까지 ramdomAlphabet 생성 (샘플 용도)
  const newNode = () => {
    let newNode = ramdomAlphabet();

    while (chartOptions.series[0].data.find((e) => e[0] === newNode || e[1] === newNode) === undefined) {
      newNode = ramdomAlphabet();
    }
    return [newNode, ramdomAlphabet()];
  };

  return (
    <div>
      <div style={{ margin: 15 }}>
        <button
          onClick={() => {
            setChartOptions({
              series: [{ data: [...chartOptions.series[0].data, newNode()] }],
            });
          }}
        >
          새로운 노드 추가
        </button>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default App;
