import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';

const ProjectsLayout = ({ children }) => {
  const { key } = useParams();
  const location = useLocation();

  return (
    <div className="bg-gray-100 p-5 h-[92vh] gap-y-2">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { name: 'Traffic', path: `/project/traffic/${key}` },
            { name: 'Enrichments', path: `/project/requests/${key}` },
            { name: 'Users', path: `/project/users/${key}` },
            { name: 'Transactions', path: null }, // Button instead of NavLink
            { name: 'Emails', path: `/project/emails/${key}` },
            { name: 'Templates', path: `/project/templates/${key}` },
          ].map(({ name, path }) => (
            <li key={name} className="me-2">
              {path ? (
                <NavLink
                  to={path}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                    location.pathname === path
                      ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                >
                  {name}
                </NavLink>
              ) : (
                <button
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                    location.pathname.includes('/transactions')
                      ? 'border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                >
                  {name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
};

export default ProjectsLayout;
