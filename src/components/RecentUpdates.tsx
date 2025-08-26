import React from 'react';
import UpdateItem, { UpdateItemProps } from './UpdateItem';

const updatesData: UpdateItemProps[] = [
  {
    actor: 'Investor X',
    timestamp: 'yesterday',
    action: 'Updated company valuation to $4000',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', 
    type: 'default'
  },
  {
    actor: 'Startup 1',
    timestamp: 'yesterday',
    action: 'Updated company valuation to $4000',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    type: 'default'
  },
  {
    actor: 'Startup 2',
    timestamp: '2 days ago',
    action: 'Updated company pitchdeck',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    type: 'default'
  },
   {
    actor: 'Startup 1',
    timestamp: '2 days ago',
    action: 'Updated company valuation to $2000',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    type: 'default'
  },
  {
    actor: 'Startup 3',
    timestamp: '3 days ago',
    action: 'We are reaching funding target',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    type: 'default'
  },
  {
    actor: 'You',
    timestamp: '3 days ago',
    action: 'You invested $400 in ',
    highlight: 'Startup Name',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
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