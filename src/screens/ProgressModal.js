import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { ProgressStep } from '../components/ProgressStep';
import { executeSwap } from '../api/mockApi';
import { swapSteps } from '../data/mockData';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

export const ProgressModal = ({ visible, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [swapResult, setSwapResult] = useState(null);

  useEffect(() => {
    if (visible) {
      startSwap();
    }
  }, [visible]);

  const startSwap = async () => {
    try {
      const result = await executeSwap((progressData) => {
        setCurrentStepIndex(progressData.currentStep);
        setProgress(progressData.progress);
      });
      
      setSwapResult(result);
      
      // Wait a moment before showing success
      setTimeout(() => {
        onComplete(result);
      }, 1000);
    } catch (error) {
      console.error('Swap failed:', error);
      // Handle error - in real app, show error state
    }
  };

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'active';
    return 'pending';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Processing Swap</Text>
            <Text style={styles.subtitle}>
              Please wait while we process your transaction
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress)}%</Text>
          </View>

          {/* Steps */}
          <View style={styles.stepsContainer}>
            {swapSteps.map((step, index) => (
              <ProgressStep
                key={step.id}
                stepName={step.name}
                description={step.description}
                status={getStepStatus(index)}
                isLast={index === swapSteps.length - 1}
              />
            ))}
          </View>

          {/* Current Step Info */}
          {currentStepIndex < swapSteps.length && (
            <View style={styles.currentStepCard}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.currentStepText}>
                {swapSteps[currentStepIndex].description}
              </Text>
            </View>
          )}

          {/* Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Do not close this screen. The swap process may take a few minutes 
              depending on network conditions.
            </Text>
          </View>
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
    padding: spacing.lg,
    ...shadows.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  progressBarContainer: {
    marginBottom: spacing.xl,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    ...typography.small,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  stepsContainer: {
    marginBottom: spacing.lg,
  },
  currentStepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 128, 141, 0.08)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  currentStepText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.md,
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  infoText: {
    ...typography.small,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
