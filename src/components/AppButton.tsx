import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors, spacing, typography} from '../theme';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary';
};

export function AppButton({
  label,
  onPress,
  style,
  variant = 'primary',
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        pressed && styles.pressed,
        style,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: spacing.radius,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  secondary: {
    backgroundColor: colors.surfaceSoft,
  },
  pressed: {
    opacity: 0.82,
  },
  label: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
});
