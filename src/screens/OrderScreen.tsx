import React, {useMemo} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {CounterControl} from '../components/CounterControl';
import {Screen} from '../components/Screen';
import {menuItems} from '../data/resortData';
import {colors, spacing, typography} from '../theme';
import type {CartItem} from '../types/app';

type OrderScreenProps = {
  cart: CartItem[];
  onCartChange: (cart: CartItem[] | ((cart: CartItem[]) => CartItem[])) => void;
  onBack: () => void;
};

export function OrderScreen({cart, onCartChange, onBack}: OrderScreenProps) {
  const rows = useMemo(
    () =>
      cart
        .map(cartItem => {
          const item = menuItems.find(
            menuItem => menuItem.id === cartItem.itemId,
          );
          return item ? {item, quantity: cartItem.quantity} : null;
        })
        .filter(Boolean),
    [cart],
  );
  const subtotal = rows.reduce(
    (total, row) => total + (row?.item.price ?? 0) * (row?.quantity ?? 0),
    0,
  );
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const changeQuantity = (itemId: string, quantity: number) => {
    onCartChange(currentCart =>
      currentCart
        .map(item =>
          item.itemId === itemId
            ? {...item, quantity: Math.max(0, quantity)}
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const submitOrder = () => {
    Alert.alert('Order Submitted', 'Your dining order has been sent.');
    onCartChange([]);
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Your Order</Text>
      </View>
      {rows.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add dining items to create an order.
          </Text>
        </View>
      ) : (
        <>
          {rows.map(row =>
            row ? (
              <View key={row.item.id} style={styles.card}>
                <View style={styles.titleRow}>
                  <View style={styles.copy}>
                    <Text style={styles.itemTitle}>{row.item.title}</Text>
                    <Text style={styles.muted}>${row.item.price} each</Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    ${row.item.price * row.quantity}
                  </Text>
                </View>
                <CounterControl
                  value={row.quantity}
                  onDecrease={() =>
                    changeQuantity(row.item.id, row.quantity - 1)
                  }
                  onIncrease={() =>
                    changeQuantity(row.item.id, row.quantity + 1)
                  }
                />
              </View>
            ) : null,
          )}
          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={`$${subtotal}`} />
            <SummaryRow label="Service Fee (10%)" value={`$${serviceFee}`} />
            <View style={styles.divider} />
            <SummaryRow label="Total" value={`$${total}`} strong />
          </View>
          <AppButton label="Submit Order" onPress={submitOrder} />
        </>
      )}
    </Screen>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, strong && styles.strongText]}>
        {label}
      </Text>
      <Text style={[styles.summaryValue, strong && styles.strongText]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  backButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    marginRight: 10,
    width: 32,
  },
  backText: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 36,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 12,
    padding: 16,
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  copy: {
    flex: 1,
    paddingRight: 12,
  },
  itemTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  itemPrice: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  muted: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  summary: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 14,
    padding: 16,
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 15,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 15,
  },
  strongText: {
    color: colors.text,
    fontWeight: '800',
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: 8,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    padding: 24,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
