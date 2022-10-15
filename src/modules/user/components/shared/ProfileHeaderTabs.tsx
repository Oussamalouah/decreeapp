import clsx from 'clsx';
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {routes} from '../../../../route-list';
import {DecreeText} from '../../../core/DecreeText';

const tabs = [
  {name: 'Orders', route: routes.USER__ORDERS},
  {name: 'Setting', route: routes.USER__SETTING},
];

export const ProfileHeaderTabs = () => {
  const {pathname} = useLocation();
  const history = useHistory();
  return (
    <div className="flex space-x-24">
      {tabs.map(tab => (
        <button
          key={tab.route}
          className={clsx('focus:outline-none px-3 border-b-4 border-white', {
            'border-gold-light': tab.route === pathname,
          })}
          onClick={() => history.push(tab.route)}
        >
          <DecreeText size={23} className="font-serif font-bold text-blue-dark">
            {tab.name}
          </DecreeText>
        </button>
      ))}
    </div>
  );
};
