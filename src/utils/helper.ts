import { Businessidea } from '../declarations/backend/backend.did';
import { StartupCardProps } from '../components/StartupCard';

export const mapBusinessIdeaToCard = (
    idea: Businessidea,
    onInvest: () => void,
    onDetail: () => void
  ): StartupCardProps => {
    return {
      name: idea.title,
      description: idea.description,
      valuation: `$${idea.valuation.toLocaleString()}`,
      target: `$${idea.raisedAmount.toLocaleString()}`,
      investors: idea.investorShares.length,
      image: idea.imageUrl,
      onInvest,
      onDetail,
    };
  };