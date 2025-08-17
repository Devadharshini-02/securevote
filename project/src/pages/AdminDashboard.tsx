import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Settings, BarChart3, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [electionStatus, setElectionStatus] = useState('inactive');
  const [votingPeriod, setVotingPeriod] = useState({
    startDate: '',
    endDate: ''
  });
  const [resultsVisible, setResultsVisible] = useState(false);
  const [candidates, setCandidates] = useState<Array<{
    id: string;
    name: string;
    position: string;
    status: string;
  }>>([]);
  const [totalVoters, setTotalVoters] = useState(0);

  useEffect(() => {
    // Load election settings
    const savedStatus = localStorage.getItem('electionStatus') || 'inactive';
    const savedPeriod = JSON.parse(localStorage.getItem('votingPeriod') || '{"startDate": "", "endDate": ""}');
    const savedResultsVisible = localStorage.getItem('resultsVisible') === 'true';
    const registeredCandidates = JSON.parse(localStorage.getItem('registeredCandidates') || '[]');
    const registeredVoters = JSON.parse(localStorage.getItem('registeredVoters') || '[]');

    setElectionStatus(savedStatus);
    setVotingPeriod(savedPeriod);
    setResultsVisible(savedResultsVisible);
    setCandidates(registeredCandidates);
    setTotalVoters(registeredVoters.length);
  }, []);

  const toggleElectionStatus = () => {
    const newStatus = electionStatus === 'active' ? 'inactive' : 'active';
    setElectionStatus(newStatus);
    localStorage.setItem('electionStatus', newStatus);
    toast.success(`Election ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
  };

  const handleVotingPeriodChange = () => {
    const startDate = prompt('Enter start date (YYYY-MM-DD):', votingPeriod.startDate);
    const endDate = prompt('Enter end date (YYYY-MM-DD):', votingPeriod.endDate);
    
    if (startDate && endDate) {
      const newPeriod = { startDate, endDate };
      setVotingPeriod(newPeriod);
      localStorage.setItem('votingPeriod', JSON.stringify(newPeriod));
      toast.success('Voting period updated');
    }
  };

  const toggleResultsVisibility = () => {
    const newVisibility = !resultsVisible;
    setResultsVisible(newVisibility);
    localStorage.setItem('resultsVisible', String(newVisibility));
    toast.success(`Results are now ${newVisibility ? 'visible' : 'hidden'}`);
  };

  const handleCandidateAction = (candidateId: string, action: 'approve' | 'reject') => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === candidateId) {
        return { ...candidate, status: action === 'approve' ? 'approved' : 'rejected' };
      }
      return candidate;
    });

    setCandidates(updatedCandidates);
    localStorage.setItem('registeredCandidates', JSON.stringify(updatedCandidates));
    toast.success(`Candidate ${action}d`);
  };

  const stats = [
    { 
      label: 'Total Voters', 
      value: totalVoters.toString(), 
      icon: Users 
    },
    { 
      label: 'Registered Candidates', 
      value: candidates.length.toString(), 
      icon: UserCheck 
    },
    { 
      label: 'Election Status', 
      value: electionStatus === 'active' ? 'Active' : 'Inactive', 
      icon: Settings 
    },
    { 
      label: 'Total Votes Cast', 
      value: Object.values(JSON.parse(localStorage.getItem('votingResults') || '{}')).reduce((a: any, b: any) => {
        const positionVotes = Object.values(b).reduce((sum: number, votes: number) => sum + votes, 0);
        return a + positionVotes;
      }, 0).toString(),
      icon: BarChart3 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Manage elections and monitor voting progress</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <h3 className="text-gray-600">{stat.label}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Candidates</h2>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.position}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {candidate.status !== 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCandidateAction(candidate.id, 'approve')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                    >
                      Approve
                    </motion.button>
                  )}
                  {candidate.status !== 'rejected' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCandidateAction(candidate.id, 'reject')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                    >
                      Reject
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
            {candidates.length === 0 && (
              <p className="text-center text-gray-600">No pending candidates</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Election Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Election Status</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleElectionStatus}
                className={`px-4 py-2 ${
                  electionStatus === 'active' 
                    ? 'bg-green-600' 
                    : 'bg-red-600'
                } text-white rounded-lg text-sm`}
              >
                {electionStatus === 'active' ? 'Active' : 'Inactive'}
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-800">Voting Period</span>
                {votingPeriod.startDate && votingPeriod.endDate && (
                  <p className="text-sm text-gray-600">
                    {votingPeriod.startDate} to {votingPeriod.endDate}
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVotingPeriodChange}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Configure
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">Results Visibility</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleResultsVisibility}
                className={`px-4 py-2 ${
                  resultsVisible 
                    ? 'bg-green-600' 
                    : 'bg-red-600'
                } text-white rounded-lg text-sm`}
              >
                {resultsVisible ? 'Visible' : 'Hidden'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;