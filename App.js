import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { BalancesScreen } from './src/screens/BalancesScreen';
import { ConfirmationModal } from './src/screens/ConfirmationModal';
import { ProgressModal } from './src/screens/ProgressModal';
import { SuccessScreen } from './src/screens/SuccessScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  // Screen state management
  const [currentScreen, setCurrentScreen] = useState('balances');

  // Data states
  const [totalUSD, setTotalUSD] = useState(0);
  const [quote, setQuote] = useState(null);
  const [swapResult, setSwapResult] = useState(null);

  // Modal visibility states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handler: User clicks "Swap All to BTC" button
  const handleSwapPress = (usdAmount) => {
    setTotalUSD(usdAmount);
    setShowConfirmation(true);
  };

  // Handler: User confirms the swap in confirmation modal
  const handleConfirmSwap = (quoteData) => {
    setQuote(quoteData);
    setShowConfirmation(false);

    // Small delay for better UX
    setTimeout(() => {
      setShowProgress(true);
    }, 300);
  };

  // Handler: User cancels confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setTotalUSD(0);
    setQuote(null);
  };

  // Handler: Swap process completes
  const handleSwapComplete = (result) => {
    setSwapResult(result);
    setShowProgress(false);

    // Small delay for better UX
    setTimeout(() => {
      setShowSuccess(true);
    }, 300);
  };

  // Handler: User closes success screen
  const handleSuccessDone = () => {
    setShowSuccess(false);

    // Reset all states
    setTimeout(() => {
      setTotalUSD(0);
      setQuote(null);
      setSwapResult(null);
      setCurrentScreen('balances');
    }, 300);
  };

  return (
      <SafeAreaView style={{flex:1,backgroundColor:"#FCFCF9"}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FCFCF9" />

        {/* Main Balances Screen */}
        <BalancesScreen onSwapPress={handleSwapPress} />

        {/* Confirmation Modal */}
        <ConfirmationModal
          visible={showConfirmation}
          totalUSD={totalUSD}
          onConfirm={handleConfirmSwap}
          onCancel={handleCancelConfirmation}
        />

        {/* Progress Modal */}
        <ProgressModal
          visible={showProgress}
          onComplete={handleSwapComplete}
        />

        {/* Success Screen */}
        <SuccessScreen
          visible={showSuccess}
          swapResult={swapResult}
          quote={quote}
          onDone={handleSuccessDone}
        />
      </SafeAreaView>
  );
};

export default App;
