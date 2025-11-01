import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

export const ProgressStep = ({ 
  stepName, 
  description, 
  status, // 'pending', 'active', 'completed'
  isLast = false 
}) => {
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <Text style={styles.checkmark}>✓</Text>;
      case 'active':
        return <ActivityIndicator size="small" color={colors.primary} />;
      case 'pending':
        return <View style={styles.pendingDot} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={[
          styles.iconContainer,
          status === 'completed' && styles.iconCompleted,
          status === 'active' && styles.iconActive,
          status === 'pending' && styles.iconPending,
        ]}>
          {getIcon()}
        </View>
        
        {!isLast && (
          <View style={[
            styles.connector,
            status === 'completed' && styles.connectorCompleted,
          ]} />
        )}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[
          styles.stepName,
          status === 'active' && styles.stepNameActive,
          status === 'completed' && styles.stepNameCompleted,
        ]}>
          {stepName}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepContainer: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    backgroundColor: colors.surface,
  },
  iconPending: {
    borderColor: colors.border,
  },
  iconActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  iconCompleted: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  checkmark: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
  },
  pendingDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.border,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: spacing.xs,
  },
  connectorCompleted: {
    backgroundColor: colors.success,
  },
  textContainer: {
    flex: 1,
    paddingTop: spacing.sm,
  },
  stepName: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  stepNameActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  stepNameCompleted: {
    color: colors.text,
    fontWeight: '600',
  },
  description: {
    ...typography.small,
    color: colors.textSecondary,
  },
});
