import React, { useState } from 'react';
import TrafficTable from './TrafficTable';
import Request from '../request';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const ProjectsLayout = ({children}) => {
    const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState('Traffic');
const {key}=useParams()
  return (
    <div className="bg-gray-100 p-5 h-[92vh] gap-y-2">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <NavLink 
              to={`/project/traffic/${key}`}
              onClick={() => setActiveTab('Traffic')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                activeTab === 'Traffic'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Traffic
            </NavLink>
          </li>
          <li className="me-2">
            <NavLink 
            to={`/project/requests/${key}`}
             
              onClick={() => setActiveTab('Enrichments')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                activeTab === 'Enrichments'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Enrichments
            </NavLink>
          </li>
          <li className="me-2">
            <button
              
              onClick={() => setActiveTab('Users')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                activeTab === 'Users'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Users
            </button>
          </li>
          <li className="me-2">
            <button
            
              onClick={() => setActiveTab('Transations')}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                activeTab === 'Transations'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Transations
            </button>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default ProjectsLayout;
