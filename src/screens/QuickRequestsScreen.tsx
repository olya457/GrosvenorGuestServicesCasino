import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {CounterControl} from '../components/CounterControl';
import {Screen} from '../components/Screen';
import {
  quickRequests,
  statusColors,
  statusFlow,
  statusLabels,
} from '../data/resortData';
import {colors, spacing, typography} from '../theme';
import type {QuickRequestState} from '../types/app';

type QuickRequestsScreenProps = {
  states: Record<string, QuickRequestState>;
  onChange: (states: Record<string, QuickRequestState>) => void;
};

export function QuickRequestsScreen({
  states,
  onChange,
}: QuickRequestsScreenProps) {
  const updateRequest = (id: string, next: QuickRequestState) => {
    onChange({
      ...states,
      [id]: next,
    });
  };

  return (
    <Screen title="Quick Requests">
      {quickRequests.map(request => {
        const state = states[request.id] ?? {quantity: 1, status: 'not_sent'};

        const handleRequest = () => {
          const currentIndex = statusFlow.indexOf(state.status);
          const nextStatus =
            state.status === 'completed'
              ? 'sent'
              : statusFlow[Math.max(1, currentIndex + 1)];

          updateRequest(request.id, {
            ...state,
            status: nextStatus,
          });
        };

        return (
          <View key={request.id} style={styles.card}>
            <Image
              source={request.image}
              resizeMode="contain"
              style={styles.image}
            />
            <View style={styles.cardHeader}>
              <View style={styles.copy}>
                <Text style={styles.title}>{request.title}</Text>
                <Text style={styles.description}>{request.description}</Text>
              </View>
              <Pressable
                onPress={handleRequest}
                style={[
                  styles.status,
                  {backgroundColor: statusColors[state.status]},
                ]}>
                <Text style={styles.statusText}>
                  {statusLabels[state.status]}
                </Text>
              </Pressable>
            </View>
            <View style={styles.actions}>
              <CounterControl
                value={state.quantity}
                onDecrease={() =>
                  updateRequest(request.id, {
                    ...state,
                    quantity: Math.max(1, state.quantity - 1),
                  })
                }
                onIncrease={() =>
                  updateRequest(request.id, {
                    ...state,
                    quantity: state.quantity + 1,
                  })
                }
              />
              <AppButton
                label="Request"
                onPress={handleRequest}
                style={styles.requestButton}
              />
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 14,
    padding: 16,
  },
  image: {
    alignSelf: 'center',
    height: 118,
    marginBottom: 8,
    width: 168,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  status: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  statusText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  requestButton: {
    minHeight: 40,
    width: 104,
  },
});
