import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import WelcomeModal from '@/components/WelcomeModal';
import { useAuth } from '@/hooks/AuthProvider';
// import Account from '../components/Account';

const Dashboard = () => {
  const { isFirstTimeUser, setIsFirstTimeUser } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const [activeTab, setActiveTab] = useState<'account' | 'filter' | 'listings'>(
    'filter',
  );

  useEffect(() => {
    // Show welcome modal if it's first time user
    if (isFirstTimeUser) {
      setShowWelcomeModal(true);
    }
  }, [isFirstTimeUser]);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    setIsFirstTimeUser(false);
  };

  const Breadcrumb = () => (
    <nav>
      <div className="md-px-10 flex space-x-8">
        {/* <button
          onClick={() => setActiveTab('account')}
          className="flex items-center space-x-2 pb-4"
        >
          <div className={`h-3 w-3 rounded-full ${
            activeTab === 'account'
              ? 'bg-teal-600'
              : 'bg-gray-300'
          }`} />
          <span className={`text-lg ${
            activeTab === 'account'
              ? 'text-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}>
            Account
          </span>
        </button> */}
        <button
          onClick={() => setActiveTab('filter')}
          className="flex items-center space-x-2 pb-4"
        >
          <div
            className={`h-3 w-3 rounded-full ${
              activeTab === 'filter' ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
          <span
            className={`text-lg ${
              activeTab === 'filter'
                ? 'text-primary'
                : 'text-gray-500 hover:text-secondary'
            }`}
          >
            Filter
          </span>
        </button>
        <button
          onClick={() => setActiveTab('listings')}
          className="flex items-center space-x-2 pb-4"
        >
          <div
            className={`h-3 w-3 rounded-full ${
              activeTab === 'listings' ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
          <span
            className={`text-lg ${
              activeTab === 'listings'
                ? 'text-primary'
                : 'text-gray-500 hover:text-secondary'
            }`}
          >
            Listings
          </span>
        </button>
      </div>
    </nav>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'filter':
        return <Filter />;
      case 'listings':
        return <div>Listings Content</div>;
      // case 'account':
      //   return <Account />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumb />
      {renderContent()}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />
    </div>
  );
};

export default Dashboard;
