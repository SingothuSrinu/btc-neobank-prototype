export const mockBalances = [
  {
    id: 1,
    chain: 'Base',
    chainFullName: 'Base Network',
    token: 'USDC',
    tokenFullName: 'USD Coin',
    amount: 1250.00,
    usdValue: 1250.00,
    logo: '🔵',
    color: '#0052FF',
  },
  {
    id: 2,
    chain: 'Polygon',
    chainFullName: 'Polygon Network',
    token: 'USDT',
    tokenFullName: 'Tether USD',
    amount: 850.50,
    usdValue: 850.50,
    logo: '🟣',
    color: '#8247E5',
  },
  {
    id: 3,
    chain: 'Ethereum',
    chainFullName: 'Ethereum Mainnet',
    token: 'DAI',
    tokenFullName: 'Dai Stablecoin',
    amount: 2100.75,
    usdValue: 2100.75,
    logo: '💎',
    color: '#627EEA',
  },
];

export const mockBTCAddress = 'bc1q5h8gzkhlm5yapzhqv6h7kzjvqc9rj4nqw7xyzp';

export const mockBTCPrice = 67500; // USD per BTC

export const swapSteps = [
  {
    id: 1,
    name: 'Aggregating',
    description: 'Collecting balances from all chains',
    duration: 2000,
  },
  {
    id: 2,
    name: 'Bridging',
    description: 'Transferring funds across chains',
    duration: 3000,
  },
  {
    id: 3,
    name: 'Swapping',
    description: 'Converting to Bitcoin',
    duration: 2500,
  },
  {
    id: 4,
    name: 'Done',
    description: 'Transaction complete',
    duration: 1000,
  },
];
