import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdmin) {
      // Admin login - using environment variables or secure storage in production
      if (formData.email === 'admin@electchain.edu' && formData.password === 'admin123') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        toast.success('Admin logged in successfully!');
        navigate('/admin');
      } else {
        toast.error('Invalid admin credentials!');
      }
    } else {
      // Voter login
      const voters = JSON.parse(localStorage.getItem('registeredVoters') || '[]');
      const voter = voters.find((v: any) => 
        v.email === formData.email && v.password === formData.password
      );
      
      if (voter) {
        localStorage.setItem('currentVoter', JSON.stringify(voter));
        toast.success('Logged in successfully!');
        navigate('/voting');
      } else {
        // Check if they're a registered candidate
        const candidates = JSON.parse(localStorage.getItem('registeredCandidates') || '[]');
        const candidate = candidates.find((c: any) => 
          c.email === formData.email && c.password === formData.password
        );

        if (candidate) {
          localStorage.setItem('currentCandidate', JSON.stringify(candidate));
          toast.success('Candidate logged in successfully!');
          navigate('/voting');
        } else {
          toast.error('Invalid credentials!');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-8">
          <LogIn className="h-12 w-12 text-red-600 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdmin(false)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              !isAdmin
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <User className="h-5 w-5 mr-2" />
            Voter/Candidate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdmin(true)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isAdmin
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Shield className="h-5 w-5 mr-2" />
            Admin
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              onChange={handleChange}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              onChange={handleChange}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/voter-registration" className="text-red-600 hover:underline">
            Register here
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;