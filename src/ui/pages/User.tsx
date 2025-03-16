import React, { useState } from 'react';

import'../style/basic.css'
import Sidebar from '../companents/sidebar';
import Header from '../companents/header';
import UserContent from '../companents/usercontent';



const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
        <div className="flex-1 ml-0 md:ml-64 transition-all">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="p-5">
            
          <UserContent />
          </div>
        </div>
      </div>
    );
  };
  
  const App: React.FC = () => {
    return <Dashboard />;
  };

export default App;