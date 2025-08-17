import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, BarChart2 } from 'lucide-react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Results() {
  const [results, setResults] = useState<{
    [key: string]: {
      candidates: { name: string; percentage: number }[];
      totalVotes: number;
    };
  }>({});
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
    const checkResultsVisibility = () => {
      const isVisible = localStorage.getItem('resultsVisible') === 'true';
      setResultsVisible(isVisible);

      if (!isVisible) return;

      const votingPeriod = JSON.parse(localStorage.getItem('votingPeriod') || '{}');
      const currentTime = new Date().getTime();
      const endTime = votingPeriod.endDate ? new Date(votingPeriod.endDate).getTime() : Infinity;
      
      if (currentTime < endTime && !isVisible) {
        return; // Don't show results until voting period ends or admin makes them visible
      }

      const positions = ['Student Body President', 'Vice President', 'Secretary', 'Treasurer'];
      const votingResults = JSON.parse(localStorage.getItem('votingResults') || '{}');
      
      const processedResults: any = {};
      
      positions.forEach(position => {
        const candidatesForPosition = Object.entries(votingResults[position] || {});
        const totalVotes = candidatesForPosition.reduce((sum, [_, votes]) => sum + (votes as number), 0);
        
        processedResults[position] = {
          candidates: candidatesForPosition.map(([name, votes]) => ({
            name,
            percentage: totalVotes > 0 ? Math.round(((votes as number) / totalVotes) * 100) : 0
          })).sort((a, b) => b.percentage - a.percentage),
          totalVotes
        };
      });

      setResults(processedResults);
    };

    checkResultsVisibility();
    // Check visibility every 30 seconds
    const interval = setInterval(checkResultsVisibility, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!resultsVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8"
        >
          <BarChart2 className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Results Not Available</h2>
          <p className="text-gray-600">
            The election results will be visible once the admin makes them available.
          </p>
        </motion.div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Election Results by Position',
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="h-12 w-12 text-red-600 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Election Results</h2>
        </div>

        {Object.entries(results).map(([position, data], index) => (
          <motion.div
            key={position}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{position}</h3>
            <div className="space-y-6">
              {data.candidates.map((candidate, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {idx === 0 && candidate.percentage > 0 && (
                        <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      )}
                      <span className="font-medium text-gray-800">{candidate.name}</span>
                    </div>
                    <span className="text-gray-600">{candidate.percentage}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${candidate.percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-red-600 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Chart
                type="bar"
                options={chartOptions}
                data={{
                  labels: data.candidates.map(c => c.name),
                  datasets: [
                    {
                      label: 'Vote Percentage',
                      data: data.candidates.map(c => c.percentage),
                      backgroundColor: 'rgba(147, 51, 234, 0.5)',
                      borderColor: 'rgb(147, 51, 234)',
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </motion.div>
        ))}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-center text-gray-600">
            Results are final and have been verified by the election committee.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Results;