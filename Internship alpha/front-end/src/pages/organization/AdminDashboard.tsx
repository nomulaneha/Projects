import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockPatientStatistics, mockPredictions } from '../../utils/mockData';
import { 
  Users, 
  BarChart4, 
  Download, 
  Search, 
  AlertTriangle, 
  Loader2, 
  Brain, 
  Map,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const AdminDashboard: React.FC = () => {
  const [stats] = useState(mockPatientStatistics);
  const [filteredPatients, setFilteredPatients] = useState(mockPredictions);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'moderate' | 'high'>('all');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  // Weekly trend data for chart
  const weeklyData = {
    labels: stats.weeklyTrend.map(item => item.date),
    datasets: [
      {
        label: 'Patients Screened',
        data: stats.weeklyTrend.map(item => item.count),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
      },
    ],
  };
  
  // Risk distribution data for chart
  const riskDistributionData = {
    labels: ['Low Risk', 'Moderate Risk', 'High Risk'],
    datasets: [
      {
        label: 'Patient Count',
        data: [150, 55, 45],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Regional distribution data for chart
  const regionalData = {
    labels: stats.regionalDistribution.map(item => item.region),
    datasets: [
      {
        label: 'Patients',
        data: stats.regionalDistribution.map(item => item.count),
        backgroundColor: 'rgba(14, 165, 233, 0.6)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(107, 114, 128, 0.2)' : 'rgba(229, 231, 235, 0.8)',
        },
      },
    },
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterPatients(e.target.value, riskFilter);
  };
  
  const handleRiskFilterChange = (risk: 'all' | 'low' | 'moderate' | 'high') => {
    setRiskFilter(risk);
    filterPatients(searchTerm, risk);
  };
  
  const filterPatients = (search: string, risk: string) => {
    let filtered = mockPredictions;
    
    // Apply risk filter
    if (risk !== 'all') {
      filtered = filtered.filter(p => p.riskLevel === risk);
    }
    
    // Apply search filter (would search by patient name in a real app)
    if (search) {
      filtered = filtered.filter(p => 
        p.id.includes(search) || p.userId.includes(search)
      );
    }
    
    setFilteredPatients(filtered);
  };
  
  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    alert('In a real app, this would download a CSV file of patient data');
  };
  
  const handleGenerateAIReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      // Open a sample PDF in a new tab (would be a real generated report in production)
      alert('In a real app, this would generate an AI-based risk analysis report');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organization Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor patient heart health data and risk factors</p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              icon={<RefreshCw className="h-4 w-4" />}
              onClick={() => alert('Data refreshed')}
            >
              Refresh
            </Button>
            <Button 
              variant="primary"
              icon={<UserPlus className="h-4 w-4" />}
            >
              Add Patient
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="flex items-center p-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-4">
            <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Screened</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalScreened}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="w-12 h-12 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center mr-4">
            <AlertTriangle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">High Risk Patients</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.highRiskCount}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-4">
          <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center mr-4">
            <BarChart4 className="h-6 w-6 text-success-600 dark:text-success-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Growth</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+12%</h3>
          </div>
        </Card>
        
        <Card className="flex items-center p-4 space-x-4">
          <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center">
            <Map className="h-6 w-6 text-warning-600 dark:text-warning-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Regions</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.regionalDistribution.length}</h3>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Weekly Trend" className="h-80">
          <div className="h-64">
            <Line data={weeklyData} options={options} />
          </div>
        </Card>
        
        <Card title="Risk Distribution" className="h-80">
          <div className="h-64">
            <Bar data={riskDistributionData} options={options} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Regional Distribution" className="lg:col-span-2 h-80">
          <div className="h-64">
            <Bar data={regionalData} options={options} />
          </div>
        </Card>
        
        <Card title="High Risk Alerts" className="overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-64 overflow-y-auto">
            {mockPredictions.filter(p => p.riskLevel === 'high').map((prediction, index) => (
              <div key={index} className="py-3 first:pt-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-danger-500 mt-2 mr-2"></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Patient #{prediction.userId}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(prediction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs py-1">
                    View
                  </Button>
                </div>
              </div>
            ))}
            {mockPredictions.filter(p => p.riskLevel === 'high').length === 0 && (
              <p className="py-4 text-center text-gray-500 dark:text-gray-400">
                No high risk patients to display
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Patient Management */}
      <Card title="Patient Management" className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={riskFilter === 'all' ? 'primary' : 'outline'}
              onClick={() => handleRiskFilterChange('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={riskFilter === 'low' ? 'success' : 'outline'}
              onClick={() => handleRiskFilterChange('low')}
              size="sm"
            >
              Low Risk
            </Button>
            <Button
              variant={riskFilter === 'moderate' ? 'warning' : 'outline'}
              onClick={() => handleRiskFilterChange('moderate')}
              size="sm"
            >
              Moderate
            </Button>
            <Button
              variant={riskFilter === 'high' ? 'danger' : 'outline'}
              onClick={() => handleRiskFilterChange('high')}
              size="sm"
            >
              High Risk
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prediction Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Risk Level
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredPatients.map((prediction, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    Patient #{prediction.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(prediction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${prediction.riskLevel === 'low' ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300' : 
                        prediction.riskLevel === 'moderate' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300' :
                        'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-300'}`
                    }>
                      {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No patients match your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            icon={<Download className="h-5 w-5" />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          
          <Button
            icon={isGeneratingReport ? <Loader2 className="h-5 w-5 animate-spin" /> : <Brain className="h-5 w-5" />}
            onClick={handleGenerateAIReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? 'Generating Report...' : 'Generate AI Report'}
          </Button>
        </div>
      </Card>
    </div>
  );
};