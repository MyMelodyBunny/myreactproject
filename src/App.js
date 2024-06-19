import React, { useState, useEffect } from 'react';
import InfoList from './components/InfoList';
import LoginForm from './components/LoginForm';
import Poll from './components/Poll';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Welcome to my poll</h1>
      {loggedIn ? (
        <>
          <InfoList data={data} />
          <Poll />
        </>
      ) : (
        <LoginForm setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
};

export default App;
