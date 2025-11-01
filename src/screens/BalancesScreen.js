import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { BalanceCard } from '../components/BalanceCard';
import { Button } from '../components/Button';
import { mockBalances } from '../data/mockData';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

export const BalancesScreen = ({ onSwapPress }) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate loading balances
  const loadBalances = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setBalances(mockBalances);
    setLoading(false);
  };

  useEffect(() => {
    loadBalances();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBalances();
    setRefreshing(false);
  };

  // Calculate total USD value
  const totalUSD = balances.reduce((sum, balance) => sum + balance.usdValue, 0);

  const handleSwapPress = () => {
    if (totalUSD > 0) {
      onSwapPress(totalUSD);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Balances</Text>
          <Text style={styles.subtitle}>Multi-chain stablecoin portfolio</Text>
        </View>

        {/* Balance Cards */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading balances...</Text>
          </View>
        ) : (
          <View style={styles.balancesContainer}>
            {balances.map((balance) => (
              <BalanceCard
                key={balance.id}
                chain={balance.chain}
                chainFullName={balance.chainFullName}
                token={balance.token}
                tokenFullName={balance.tokenFullName}
                amount={balance.amount}
                usdValue={balance.usdValue}
                logo={balance.logo}
                color={balance.color}
              />
            ))}
          </View>
        )}

        {/* Total Value Card */}
        {!loading && (
          <View style={styles.totalCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Portfolio Value</Text>
              <Text style={styles.totalValue}>
                ${totalUSD.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </Text>
            </View>
            <View style={styles.totalInfo}>
              <Text style={styles.totalInfoText}>
                {balances.length} stablecoins across {balances.length} chains
              </Text>
            </View>
          </View>
        )}

        {/* Swap Button */}
        {!loading && (
          <View style={styles.buttonContainer}>
            <Button
              title="Swap All to BTC"
              onPress={handleSwapPress}
              variant="primary"
              size="large"
              fullWidth
              disabled={totalUSD === 0}
            />
            <Text style={styles.buttonHint}>
              Convert all your stablecoins to Bitcoin in one click
            </Text>
          </View>
        )}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 About Multi-Chain Swaps</Text>
          <Text style={styles.infoText}>
            We aggregate your balances across Base, Polygon, and Ethereum, then execute 
            an optimized swap to Bitcoin using smart routing and bridge protocols.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  loadingContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  balancesContainer: {
    marginBottom: spacing.md,
  },
  totalCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalLabel: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  totalValue: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
  },
  totalInfo: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalInfoText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  buttonContainer: {
    marginBottom: spacing.lg,
  },
  buttonHint: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  infoSection: {
    backgroundColor: 'rgba(33, 128, 141, 0.08)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoTitle: {
    ...typography.bodyLarge,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  infoText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
