import React from 'react';
import { motion } from 'framer-motion';
import { Vote, Shield, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Shield,
      title: 'Secure',
      description: 'Advanced encryption ensures your vote remains confidential'
    },
    {
      icon: Vote,
      title: 'Transparent',
      description: 'Clear voting process with real-time monitoring'
    },
    {
      icon: Award,
      title: 'Auditable',
      description: 'Comprehensive audit trails for verification'
    },
    {
      icon: Clock,
      title: 'Reliable',
      description: 'Dependable system with 99.9% uptime guarantee'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to ElectChain
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          STAR Vote: Secure • Transparent • Auditable • Reliable
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <feature.icon className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to make your voice heard?</h2>
        <p className="text-lg mb-6">
          Register now to participate in your college elections
        </p>
        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/voter-registration')}
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold"
          >
            Register as Voter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/about')}
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;