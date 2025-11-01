import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export const BalanceCard = ({
  chain,
  chainFullName,
  token,
  tokenFullName,
  amount,
  usdValue,
  logo,
  color,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: color + '20' }]}>
          <Text style={styles.logo}>{logo}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.chain}>{chain}</Text>
          <Text style={styles.chainFullName}>{chainFullName}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.label}>Token</Text>
          <Text style={styles.token}>{token}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Value</Text>
          <Text style={styles.usd}>${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logo: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  chain: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chainFullName: {
    ...typography.small,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  body: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  token: {
    ...typography.bodyLarge,
    color: colors.text,
    fontWeight: '600',
  },
  amount: {
    ...typography.bodyLarge,
    color: colors.text,
    fontWeight: '500',
  },
  usd: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '600',
  },
});
