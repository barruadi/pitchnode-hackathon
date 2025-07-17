import React from 'react';
import UpdateItem, { UpdateItemProps } from './UpdateItem';

const updatesData: UpdateItemProps[] = [
  {
    actor: 'Investor X',
    timestamp: 'yesterday',
    action: 'Updated company valuation to $4000',
    avatarUrl: '/avatars/avatar1.png', 
    type: 'default'
  },
  {
    actor: 'Startup 1',
    timestamp: 'yesterday',
    action: 'Updated company valuation to $4000',
    avatarUrl: '/avatars/avatar2.png',
    type: 'default'
  },
  {
    actor: 'Startup 2',
    timestamp: '2 days ago',
    action: 'Updated company pitchdeck',
    avatarUrl: '/avatars/avatar3.png',
    type: 'default'
  },
   {
    actor: 'Startup 1',
    timestamp: '2 days ago',
    action: 'Updated company valuation to $2000',
    avatarUrl: '/avatars/avatar2.png',
    type: 'default'
  },
  {
    actor: 'Startup 3',
    timestamp: '3 days ago',
    action: 'We are reaching funding target',
    avatarUrl: '/avatars/avatar4.png',
    type: 'default'
  },
  {
    actor: 'You',
    timestamp: '3 days ago',
    action: 'You invested $400 in ',
    highlight: 'Startup Name',
    type: 'user'
  },
];

const RecentUpdates: React.FC = () => {
  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Recent Updates</h2>
        <a href="#" className="text-sm font-semibold text-gray-400 hover:text-gray-600">
          see more
        </a>
      </div>
      <div className="space-y-4">
        {updatesData.map((item, index) => (
          <UpdateItem key={index} {...item} />
        ))}
      </div>
       <p className="text-center text-gray-400 text-sm mt-6">
        No More Updates
      </p>
    </div>
  );
};

export default RecentUpdates;