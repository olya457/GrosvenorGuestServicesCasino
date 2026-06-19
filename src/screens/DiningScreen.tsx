import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {menuCategories, menuItems} from '../data/resortData';
import {colors, spacing, typography} from '../theme';
import type {CartItem, MenuCategory, MenuItem} from '../types/app';

type DiningScreenProps = {
  cart: CartItem[];
  onCartChange: (cart: CartItem[] | ((cart: CartItem[]) => CartItem[])) => void;
  onOpenOrder: () => void;
};

export function DiningScreen({
  cart,
  onCartChange,
  onOpenOrder,
}: DiningScreenProps) {
  const [category, setCategory] = useState<MenuCategory>('Breakfast');
  const {width} = useWindowDimensions();
  const menuImageSize = Math.min(240, width - spacing.screenX * 2 - 32);
  const filteredItems = useMemo(
    () => menuItems.filter(item => item.category === category),
    [category],
  );
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const itemQuantities = useMemo(
    () =>
      cart.reduce<Record<string, number>>((quantities, cartItem) => {
        quantities[cartItem.itemId] = cartItem.quantity;
        return quantities;
      }, {}),
    [cart],
  );

  const addItem = (item: MenuItem) => {
    onCartChange(currentCart => {
      const existing = currentCart.find(
        cartItem => cartItem.itemId === item.id,
      );

      if (existing) {
        return currentCart.map(cartItem =>
          cartItem.itemId === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        );
      }

      return [...currentCart, {itemId: item.id, quantity: 1}];
    });
  };

  const cartButton = (
    <Pressable onPress={onOpenOrder} style={styles.cartButton}>
      <Text style={styles.cartIcon}>🛒</Text>
      {cartQuantity > 0 ? (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
        </View>
      ) : null}
    </Pressable>
  );

  return (
    <Screen title="Dining" headerRight={cartButton}>
      <View style={styles.tabs}>
        {menuCategories.map(item => {
          const active = category === item;

          return (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[styles.tab, active && styles.activeTab]}>
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {filteredItems.map(item => {
        const quantity = itemQuantities[item.id] ?? 0;

        return (
          <View key={item.id} style={styles.card}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={[
                styles.image,
                {height: menuImageSize, width: menuImageSize},
              ]}
            />
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <Text style={styles.ingredients}>{item.ingredients}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <AppButton
              label={quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
              onPress={() => addItem(item)}
              style={styles.addButton}
              variant={quantity > 0 ? 'secondary' : 'primary'}
            />
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    alignItems: 'center',
    borderRadius: spacing.radius,
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  activeTab: {
    backgroundColor: colors.surfaceSoft,
  },
  tabText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.text,
  },
  cartButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: 10,
    height: 22,
    justifyContent: 'center',
    minWidth: 22,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cartBadgeText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 14,
    padding: 16,
  },
  image: {
    alignSelf: 'center',
    borderRadius: spacing.radius,
    marginBottom: 14,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  price: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  ingredients: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
  },
  addButton: {
    marginTop: 14,
  },
});
