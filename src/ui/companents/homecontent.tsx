import React from 'react';
import "../style/basic.css";
import { ShoppingCart, DollarSign, Users, Package } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  trend: 'up' | 'down';
}

const HomeContent: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: "Total Sales",
      value: "$12,426",
      icon: <DollarSign className="w-8 h-8 text-blue-500" />,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active Orders",
      value: "56",
      icon: <ShoppingCart className="w-8 h-8 text-green-500" />,
      change: "+8%",
      trend: "up"
    },
    {
      title: "Total Products",
      value: "182",
      icon: <Package className="w-8 h-8 text-purple-500" />,
      change: "+24",
      trend: "up"
    },
    {
      title: "Total Customers",
      value: "2,245",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      change: "+15%",
      trend: "up"
    }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "$299.99", status: "Pending" },
    { id: "ORD-002", customer: "Jane Smith", amount: "$149.50", status: "Completed" },
    { id: "ORD-003", customer: "Bob Johnson", amount: "$599.99", status: "Processing" }
  ];

  return (
    <div className="p-6">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="rounded-full p-3 bg-gray-50">{stat.icon}</div>
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Latest transactions from your store</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;