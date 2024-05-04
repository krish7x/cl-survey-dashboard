import { npsPercentageData } from '@/constants/reportsMockData';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const percentageOptions = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Survey Request Date',
      },
      stacked: true,
    },
    y: {
      title: {
        display: true,
        text: '% Response',
      },
      stacked: true,
    },
  },
};

export const percentageData = {
  labels: npsPercentageData.map(item => item.date),
  datasets: [
    {
      label: 'Promoters',
      data: npsPercentageData.map(item => item.promoters_percentage),
      backgroundColor: '#008000',
    },
    {
      label: 'Passives',
      data: npsPercentageData.map(item => item.passives_percentage),
      backgroundColor: '#cccc00',
    },
    {
      label: 'Detractors',
      data: npsPercentageData.map(item => item.detrators_percentage),
      backgroundColor: '#ff0000',
    },
  ],
};

export const absoluteOptions = {
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: true,
      position: 'bottom',
    },
  },
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Survey Request Date',
      },
      stacked: true,
    },
    y: {
      title: {
        display: true,
        text: 'Response Count',
      },
      stacked: true,
    },
  },
};

export const absoluteData = {
  labels: npsPercentageData.map(item => item.date),
  datasets: [
    {
      label: 'Promoters',
      data: npsPercentageData.map(item => item.promoters),
      backgroundColor: '#008000',
    },
    {
      label: 'Passives',
      data: npsPercentageData.map(item => item.passives),
      backgroundColor: '#cccc00',
    },
    {
      label: 'Detractors',
      data: npsPercentageData.map(item => item.detrators),
      backgroundColor: '#ff0000',
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Survey Request Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'NPS Score',
      },
    },
  },
};

const lineChartData = {
  labels: npsPercentageData.map(item => item.date),
  datasets: [
    {
      label: 'NPS Score',
      data: npsPercentageData.map(item => item.nps.toFixed(2)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function NPSAnalytics(props: {
  showModal: boolean;
  onClose: (value: boolean) => void;
  surveyName: string;
}) {
  const { showModal, onClose, surveyName } = props;
  const [currentChart, setCurrentChart] = useState('PERCENTAGE');

  const handleButtonClick = (type: string) => {
    setCurrentChart(type);
  };

  return (
    <Modal
      size="7xl"
      show={showModal}
      popup
      onClose={() => onClose(false)}
    >
      <Modal.Header>
        <h3 className="p-6 px-10 text-lg font-medium text-gray-900">
          {`Trend - ${surveyName}`}
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-x-aut flex h-auto flex-col">
          <div
            className="inline-flex rounded-md shadow-sm"
            role="group"
          >
            <button
              type="button"
              className="rounded-s-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
              onClick={() => handleButtonClick('PERCENTAGE')}
            >
              Percentage Bar Chart
            </button>
            <button
              type="button"
              className="border-b border-t border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
              onClick={() => handleButtonClick('ABSOLUTE')}
            >
              Absolute Bar Chart
            </button>
            <button
              type="button"
              className="rounded-e-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700"
              onClick={() => handleButtonClick('NPS_LINE_CHART')}
            >
              NPS Score Line Chart
            </button>
          </div>
          <div className="my-12">
            {currentChart === 'PERCENTAGE' && (
              <Bar
                options={percentageOptions as object}
                data={percentageData}
              />
            )}
            {currentChart === 'ABSOLUTE' && (
              <Bar
                options={absoluteOptions as object}
                data={absoluteData}
              />
            )}
            {currentChart === 'NPS_LINE_CHART' && (
              <Line
                options={lineChartOptions as object}
                data={lineChartData}
              />
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
