import React, { useState } from 'react';

import'../style/basic.css'
import Sidebar from '../companents/Sidebar';
import Header from '../companents/Header';
import Content from '../companents/content';



const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
        <div className="flex-1 ml-0 md:ml-64 transition-all">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="p-5">
            <h3 className="text-xl font-semibold">Product Data</h3>
            <Content />
          </div>
        </div>
      </div>
    );
  };
  
  const App: React.FC = () => {
    return <Dashboard />;
  };

export default App;