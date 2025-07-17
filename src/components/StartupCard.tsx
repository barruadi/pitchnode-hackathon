import React from 'react';

export interface StartupCardProps {
  name: string;
  description: string;
  valuation: string;
  target: string;
  investors: number;
  image?: string;
  onInvest: () => void;
  onDetail: () => void;
}

const StartupCard: React.FC<StartupCardProps> = ({
  name,
  description,
  valuation,
  target,
  investors,
  image,
  onInvest,
  onDetail,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full h-48 bg-gray-100 relative">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-4xl font-bold text-gray-300">
              {name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Valuation</div>
            <div className="text-lg font-semibold text-gray-900">
              {valuation}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Target</div>
            <div className="text-lg font-semibold text-gray-900">{target}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Investors</div>
            <div className="text-lg font-semibold text-gray-900">
              {investors}
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onInvest}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Invest
          </button>
          <button
            onClick={onDetail}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
