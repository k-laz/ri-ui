import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import FilterForm from '@/components/FilterForm';

const Dashboard = () => {
  const auth = useAuth();
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !userData) {
      return;
    }

    if (!userData.filter) {
      console.log('No Filter');
      // navigate('/filter/setup');
    }
  }, [userData, navigate, auth]);

  if (!auth || !userData) {
    return <div>Loading...</div>;
  }

  // const { filter, listings } = userData;

  // const handleInputChange = (e) => {
  //   console.log(e.target);
  // };

  // const handleCheckboxChange = (e) => {
  //   console.log(e.target);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   alert('Filter updated successfully!');
  // };

  return <FilterForm />;
};

export default Dashboard;
