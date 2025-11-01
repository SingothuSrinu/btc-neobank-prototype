import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Button } from '../components/Button';
import { getSwapQuote } from '../api/mockApi';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export const ConfirmationModal = ({ 
  visible, 
  totalUSD, 
  onConfirm, 
  onCancel 
}) => {
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible) {
      fetchQuote();
    }
  }, [visible]);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const quoteData = await getSwapQuote(totalUSD);
      setQuote(quoteData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (quote) {
      onConfirm(quote);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Swap</Text>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Fetching best quote...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorTitle}>Error</Text>
                <Text style={styles.errorText}>{error}</Text>
                <Button
                  title="Try Again"
                  onPress={fetchQuote}
                  variant="primary"
                  size="medium"
                />
              </View>
            ) : quote ? (
              <>
                {/* Quote Details */}
                <View style={styles.quoteCard}>
                  <View style={styles.quoteRow}>
                    <Text style={styles.quoteLabel}>You're swapping</Text>
                    <View style={styles.quoteValueContainer}>
                      <Text style={styles.quoteValue}>
                        ${totalUSD.toLocaleString('en-US', { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })}
                      </Text>
                      <Text style={styles.quoteCurrency}>USD</Text>
                    </View>
                  </View>

                  <View style={styles.divider}>
                    <View style={styles.arrowIcon}>
                      <Text style={styles.arrow}>↓</Text>
                    </View>
                  </View>

                  <View style={styles.quoteRow}>
                    <Text style={styles.quoteLabel}>You'll receive</Text>
                    <View style={styles.quoteValueContainer}>
                      <Text style={styles.quoteValueBTC}>{quote.estimatedBTC}</Text>
                      <Text style={styles.quoteCurrency}>BTC</Text>
                    </View>
                  </View>
                </View>

                {/* Rate Info */}
                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Exchange Rate</Text>
                    <Text style={styles.infoValue}>
                      1 BTC = ${quote.btcPrice.toLocaleString('en-US')}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Network Fee</Text>
                    <Text style={styles.infoValue}>
                      ${quote.fee.toFixed(2)} ({quote.feePercentage}%)
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Estimated Time</Text>
                    <Text style={styles.infoValue}>~2-5 minutes</Text>
                  </View>
                </View>

                {/* Warning */}
                <View style={styles.warningCard}>
                  <Text style={styles.warningIcon}>ℹ️</Text>
                  <Text style={styles.warningText}>
                    Quote expires in {quote.expiresIn} seconds. 
                    Final amount may vary slightly due to market conditions.
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <Button
                    title="Confirm & Swap"
                    onPress={handleConfirm}
                    variant="primary"
                    size="large"
                    fullWidth
                  />
                  <View style={styles.buttonSpacing} />
                  <Button
                    title="Cancel"
                    onPress={onCancel}
                    variant="outline"
                    size="large"
                    fullWidth
                  />
                  <View style={styles.buttonSpacing} />
                </View>
              </>
            ) : null}
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
    padding: spacing.md,
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h3,
    color: colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  content: {
    padding: spacing.lg,
  },
  loadingContainer: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  errorContainer: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorTitle: {
    ...typography.h3,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  quoteCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  quoteRow: {
    marginBottom: spacing.md,
  },
  quoteLabel: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  quoteValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  quoteValue: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  quoteValueBTC: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  quoteCurrency: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  divider: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  arrowIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 128, 141, 0.08)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  warningIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  warningText: {
    ...typography.small,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: spacing.md,
    paddingBottom:32
  },
  buttonSpacing: {
    height: spacing.md,
  },
});
