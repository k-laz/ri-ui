// Dashboard.tsx
import { useState } from 'react';
import Filter from '../components/Filter';
import Account from '../components/Account';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'filter' | 'account'>('filter');

  const Breadcrumb = () => (
    <nav>
      <div className="md-px-10 flex space-x-4">
        {/* <button
          onClick={() => setActiveTab('account')}
          className={`pb-4 text-lg ${
            activeTab === 'account'
              ? ' text-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Account
        </button> */}
        <button
          onClick={() => setActiveTab('filter')}
          className={`pb-4 text-lg ${
            activeTab === 'filter'
              ? ' text-primary'
              : 'text-gray-500 hover:text-secondary'
          }`}
        >
          Filter
        </button>
      </div>
    </nav>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb />
      {activeTab === 'filter' ? <Filter /> : <Account />}
    </div>
  );
};

export default Dashboard;
