import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, spacing, typography} from '../theme';

type CounterControlProps = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function CounterControl({
  value,
  onDecrease,
  onIncrease,
}: CounterControlProps) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onDecrease} style={styles.step}>
        <Text style={styles.stepText}>-</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable onPress={onIncrease} style={styles.step}>
        <Text style={styles.stepText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  step: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: spacing.radius,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  stepText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  value: {
    color: colors.text,
    fontSize: typography.body,
    minWidth: 20,
    textAlign: 'center',
  },
});
