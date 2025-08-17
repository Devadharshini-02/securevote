import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Vote, UserPlus, Users, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            <img src="https://ik.imagekit.io/tbxajkxcm/logo.png?updatedAt=1732767434604" height="60" width="60" style={{borderRadius:300/2}} alt="logo"/>
            <span className="text-4xl font-bold text-red-800  ">ElectChain</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {[
              { path: '/voter-registration', icon: UserPlus, label: 'Register as Voter' },
              { path: '/candidate-registration', icon: Users, label: 'Register as Candidate' },
              { path: '/login', icon: LogIn, label: 'Login' },
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className="relative group"
              >
                <motion.div
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(path)
                      ? 'text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </motion.div>
                {isActive(path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;