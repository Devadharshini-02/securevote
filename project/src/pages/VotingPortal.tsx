import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Vote, Award, AlertCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function VotingPortal() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [candidates, setCandidates] = useState<Array<{
    id: string;
    name: string;
    manifesto: string;
    position: string;
  }>>([]);

  useEffect(() => {
    // Get voting period
    const votingPeriod = JSON.parse(localStorage.getItem('votingPeriod') || '{}');
    const endTime = new Date(votingPeriod.endDate).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeRemaining('Voting period has ended');
        navigate('/results');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
      }
    }, 1000);

    // Get approved candidates
    const registeredCandidates = JSON.parse(localStorage.getItem('registeredCandidates') || '[]');
    const approvedCandidates = registeredCandidates.filter((c: any) => c.status === 'approved');
    setCandidates(approvedCandidates);

    // Check if user has voted
    const currentVoter = JSON.parse(localStorage.getItem('currentVoter') || '{}');
    const hasUserVoted = localStorage.getItem(`hasVoted_${currentVoter.id}`) === 'true';
    if (hasUserVoted) {
      setHasVoted(true);
    }

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVote = () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate');
      return;
    }

    const currentVoter = JSON.parse(localStorage.getItem('currentVoter') || '{}');
    const selectedCandidateData = candidates.find(c => c.id === selectedCandidate);
    
    if (!selectedCandidateData) return;

    // Update votes
    const votingResults = JSON.parse(localStorage.getItem('votingResults') || '{}');
    const positionResults = votingResults[selectedCandidateData.position] || {};
    
    positionResults[selectedCandidateData.name] = (positionResults[selectedCandidateData.name] || 0) + 1;
    votingResults[selectedCandidateData.position] = positionResults;
    
    localStorage.setItem('votingResults', JSON.stringify(votingResults));
    localStorage.setItem(`hasVoted_${currentVoter.id}`, 'true');
    
    setHasVoted(true);
    toast.success('Your voice matters—thank you for shaping the future!', {
      duration: 5000,
      icon: '🎉'
    });
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
        >
          <Vote className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Voting!</h2>
          <p className="text-gray-600 mb-6">Your voice matters—thank you for shaping the future!</p>
          <p className="text-sm text-gray-500 mb-6">Results will be available after the voting period ends.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-8">
          <Award className="h-12 w-12 text-red-600 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Cast Your Vote</h2>
        </div>

        <div className="mb-8">
          <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-pink-500 mr-2" />
              <p className="text-pink-700 font-medium">{timeRemaining}</p>
            </div>
          </div>
        </div>

        {candidates.length > 0 ? (
          <div className="mb-8">
            {['Student Body President', 'Vice President', 'Secretary', 'Treasurer'].map((position) => {
              const positionCandidates = candidates.filter(c => c.position === position);
              if (positionCandidates.length === 0) return null;

              return (
                <div key={position} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{position}</h3>
                  <div className="space-y-4">
                    {positionCandidates.map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border-2 rounded-lg cursor-pointer ${
                          selectedCandidate === candidate.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{candidate.name}</h4>
                            <p className="text-gray-600">{candidate.manifesto}</p>
                          </div>
                          <div className="h-6 w-6 border-2 rounded-full flex items-center justify-center">
                            {selectedCandidate === candidate.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-3 w-3 bg-red-600 rounded-full"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No candidates have been approved yet.</p>
          </div>
        )}

        {candidates.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVote}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Submit Vote
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default VotingPortal;