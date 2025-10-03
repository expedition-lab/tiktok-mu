import MarketplaceClient from './MarketplaceClient';

export const metadata = {
  title: 'Marketplace — TokMarket.Live',
  description:
    'Buy and sell products promoted by TikTok creators on TokMarket.Live. Secure checkout via PayPal or Juice.',
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
