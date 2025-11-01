import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Button } from '../components/Button';
import { mockBTCAddress } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export const SuccessScreen = ({ visible, swapResult, quote, onDone }) => {
  if (!swapResult || !quote) return null;

  const copyToClipboard = (text) => {
    // In real app, use Clipboard API
    console.log('Copied:', text);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDone}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Success Icon */}
            <View style={styles.iconContainer}>
              <View style={styles.successCircle}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Swap Complete!</Text>
            <Text style={styles.subtitle}>
              Your transaction has been successfully processed
            </Text>

            {/* BTC Received Card */}
            <View style={styles.btcCard}>
              <Text style={styles.btcLabel}>You Received</Text>
              <View style={styles.btcValueContainer}>
                <Text style={styles.btcIcon}>₿</Text>
                <Text style={styles.btcValue}>{swapResult.btcReceived}</Text>
              </View>
              <Text style={styles.btcCurrency}>Bitcoin</Text>
            </View>

            {/* Transaction Details */}
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Transaction Details</Text>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount Swapped</Text>
                <Text style={styles.detailValue}>
                  ${quote.totalUSD.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Exchange Rate</Text>
                <Text style={styles.detailValue}>
                  1 BTC = ${quote.btcPrice.toLocaleString('en-US')}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Network Fee</Text>
                <Text style={styles.detailValue}>
                  ${quote.fee.toFixed(2)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Transaction Hash</Text>
                <TouchableOpacity 
                  onPress={() => copyToClipboard(swapResult.txHash)}
                  style={styles.hashContainer}
                >
                  <Text style={styles.hashValue} numberOfLines={1}>
                    {swapResult.txHash}
                  </Text>
                  <Text style={styles.copyIcon}>📋</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {new Date(swapResult.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>

            {/* BTC Address Card */}
            <View style={styles.addressCard}>
              <Text style={styles.addressLabel}>Destination Address</Text>
              <TouchableOpacity 
                onPress={() => copyToClipboard(mockBTCAddress)}
                style={styles.addressContainer}
              >
                <Text style={styles.addressValue} numberOfLines={2}>
                  {mockBTCAddress}
                </Text>
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
              <Text style={styles.addressHint}>
                Tap to copy address
              </Text>
            </View>

            {/* Success Message */}
            <View style={styles.messageCard}>
              <Text style={styles.messageIcon}>🎉</Text>
              <Text style={styles.messageText}>
                Your Bitcoin has been successfully deposited to your wallet. 
                You can view the transaction on the blockchain explorer.
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              {/* <Button
                title="View on Explorer"
                onPress={() => console.log('View on explorer')}
                variant="secondary"
                size="large"
                fullWidth
              />
              <View style={styles.buttonSpacing} /> */}
              <Button
                title="Done"
                onPress={onDone}
                variant="primary"
                size="large"
                fullWidth
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex:1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    width: '90%',
    maxWidth: 500,
    maxHeight: '90%',
    ...shadows.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  checkmark: {
    fontSize: 48,
    color: colors.white,
    fontWeight: 'bold',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  btcCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  btcLabel: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
  },
  btcValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  btcIcon: {
    fontSize: 32,
    color: colors.white,
    marginRight: spacing.sm,
  },
  btcValue: {
    ...typography.h1,
    fontSize: 36,
    color: colors.white,
    fontWeight: '700',
  },
  btcCurrency: {
    ...typography.bodyLarge,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  detailsCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailsTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'right',
  },
  hashContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: spacing.md,
  },
  hashValue: {
    ...typography.small,
    color: colors.primary,
    fontFamily: 'monospace',
    flex: 1,
  },
  copyIcon: {
    fontSize: 16,
    marginLeft: spacing.sm,
  },
  addressCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  addressValue: {
    ...typography.body,
    color: colors.text,
    fontFamily: 'monospace',
    flex: 1,
  },
  addressHint: {
    ...typography.small,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 128, 141, 0.08)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  messageIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  messageText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  buttonSpacing: {
    height: spacing.md,
  },
});
