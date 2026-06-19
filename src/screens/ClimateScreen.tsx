import React, {useEffect, useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {climateModes, fanSpeeds} from '../data/resortData';
import {colors, spacing, typography} from '../theme';
import type {ClimateSettings} from '../types/app';

type ClimateScreenProps = {
  settings: ClimateSettings;
  onApply: (settings: ClimateSettings) => void;
};

export function ClimateScreen({settings, onApply}: ClimateScreenProps) {
  const [draft, setDraft] = useState(settings);
  const [currentTemperature, setCurrentTemperature] = useState(19);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemperature(current => {
        if (current < draft.targetTemperature) {
          return current + 1;
        }

        if (current > draft.targetTemperature) {
          return current - 1;
        }

        return current;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [draft.targetTemperature]);

  const applyChanges = () => {
    onApply(draft);
    Alert.alert('Climate Control', 'Room climate settings updated.');
  };

  return (
    <Screen title="Climate Control">
      <View style={styles.tempCard}>
        <Text style={styles.eyebrow}>CURRENT ROOM TEMPERATURE</Text>
        <Text style={styles.currentTemp}>
          {currentTemperature}
          {'\u00b0'}C
        </Text>
        <Text style={styles.status}>
          {currentTemperature === draft.targetTemperature
            ? 'System holding target temperature'
            : 'System adjusting in real time'}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>TARGET TEMPERATURE</Text>
        <View style={styles.targetRow}>
          <Pressable
            onPress={() =>
              setDraft(current => ({
                ...current,
                targetTemperature: Math.max(16, current.targetTemperature - 1),
              }))
            }
            style={styles.roundButton}>
            <Text style={styles.roundButtonText}>-</Text>
          </Pressable>
          <Text style={styles.target}>
            {draft.targetTemperature}
            {'\u00b0'}
          </Text>
          <Pressable
            onPress={() =>
              setDraft(current => ({
                ...current,
                targetTemperature: Math.min(30, current.targetTemperature + 1),
              }))
            }
            style={styles.roundButton}>
            <Text style={styles.roundButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
      <OptionGroup
        label="MODE"
        options={climateModes}
        value={draft.mode}
        onChange={mode => setDraft(current => ({...current, mode}))}
      />
      <OptionGroup
        label="FAN SPEED"
        options={fanSpeeds}
        value={draft.fanSpeed}
        onChange={fanSpeed => setDraft(current => ({...current, fanSpeed}))}
      />
      <AppButton label="Apply Changes" onPress={applyChanges} />
    </Screen>
  );
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{label}</Text>
      <View style={styles.options}>
        {options.map(option => {
          const active = option === value;

          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.option, active && styles.activeOption]}>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 12,
    padding: 16,
  },
  tempCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 12,
    padding: 20,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 12,
  },
  currentTemp: {
    color: colors.text,
    fontSize: 46,
    fontWeight: '300',
  },
  status: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  targetRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  target: {
    color: colors.text,
    fontSize: 56,
    fontWeight: '300',
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  roundButtonText: {
    color: colors.text,
    fontSize: 24,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: spacing.radius,
    flexBasis: '48%',
    flexGrow: 1,
    minHeight: 46,
    justifyContent: 'center',
  },
  activeOption: {
    backgroundColor: colors.accent,
  },
  optionText: {
    color: colors.text,
    fontSize: typography.body,
  },
});
