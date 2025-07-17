import React from 'react';

export interface UpdateItemProps {
  actor: string;
  timestamp: string;
  action: string;
  highlight?: string;
  avatarUrl?: string;
  type: 'default' | 'user';
}

const AvatarPlaceholder: React.FC<{ char: string }> = ({ char }) => (
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xl">
        {char}
    </div>
);


const UpdateItem: React.FC<UpdateItemProps> = ({ actor, timestamp, action, highlight, avatarUrl, type }) => {
  const containerClasses = "p-4 rounded-lg flex items-center gap-4";
  const finalContainerClasses = type === 'user'
    ? `${containerClasses} bg-white border border-gray-200 shadow-sm`
    : `${containerClasses} bg-white shadow-sm`;

  const getAvatar = () => {
      if (avatarUrl) {
          return <img src={avatarUrl} alt={actor} className="w-10 h-10 rounded-full object-cover" />;
      }
      return <AvatarPlaceholder char={actor.charAt(0)} />;
  }

  return (
    <div className={finalContainerClasses}>
      <div className="flex-shrink-0">
        {getAvatar()}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-baseline">
          <p className="font-bold text-sm text-gray-900">{actor}</p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {action}
          {highlight && <span className="font-bold text-gray-800">{highlight}</span>}
        </p>
      </div>
    </div>
  );
};

export default UpdateItem;