import React from 'react';
import Sidebar from '../companents/sidebar';
import Header from '../companents/header';
import Content from '../companents/content';
import'../style/basic.css'

const Home: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Home;