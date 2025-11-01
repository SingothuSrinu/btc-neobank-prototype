import { mockBTCPrice, swapSteps } from '../data/mockData';

/**
 * Simulate getting a swap quote from an aggregator
 * @param {number} totalUSD - Total USD value to swap
 * @returns {Promise} Quote object
 */
export const getSwapQuote = async (totalUSD) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate occasional errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch quote. Please try again.');
  }
  
  const estimatedBTC = totalUSD / mockBTCPrice;
  const fee = totalUSD * 0.005; // 0.5% fee
  const finalBTC = (totalUSD - fee) / mockBTCPrice;
  
  return {
    totalUSD: totalUSD,
    estimatedBTC: finalBTC.toFixed(8),
    btcPrice: mockBTCPrice,
    fee: fee,
    feePercentage: 0.5,
    timestamp: new Date().toISOString(),
    expiresIn: 30, // seconds
  };
};

/**
 * Simulate multi-step swap execution
 * @param {function} onProgress - Callback for progress updates
 * @returns {Promise} Swap result
 */
export const executeSwap = async (onProgress) => {
  for (let i = 0; i < swapSteps.length; i++) {
    const step = swapSteps[i];
    
    // Update progress
    onProgress({
      currentStep: i,
      stepName: step.name,
      stepDescription: step.description,
      progress: ((i + 1) / swapSteps.length) * 100,
    });
    
    // Simulate step duration
    await new Promise(resolve => setTimeout(resolve, step.duration));
  }
  
  // Return final result
  return {
    success: true,
    btcReceived: '0.06222222',
    txHash: '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString(),
  };
};

/**
 * Validate if swap is possible
 * @param {number} totalUSD - Total amount to swap
 * @returns {object} Validation result
 */
export const validateSwap = (totalUSD) => {
  if (totalUSD <= 0) {
    return {
      valid: false,
      error: 'Insufficient balance',
    };
  }
  
  if (totalUSD < 10) {
    return {
      valid: false,
      error: 'Minimum swap amount is $10',
    };
  }
  
  return {
    valid: true,
    error: null,
  };
};
