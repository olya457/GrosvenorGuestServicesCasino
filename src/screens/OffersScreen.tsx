import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Screen} from '../components/Screen';
import {offers} from '../data/resortData';
import {colors, spacing, typography} from '../theme';

export function OffersScreen() {
  const today = new Date().getDay();
  const {width} = useWindowDimensions();
  const imageSize = Math.min(300, width - spacing.screenX * 2 - 32);

  return (
    <Screen title="Special Offers">
      {offers.map(offer => {
        const active = offer.dayIndex === today;

        return (
          <View
            key={offer.id}
            style={[styles.card, active && styles.activeCard]}>
            <Image
              source={offer.image}
              resizeMode="contain"
              style={[styles.image, {height: imageSize, width: imageSize}]}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SPECIAL OFFER</Text>
            </View>
            <Text style={styles.eyebrow}>{offer.venue.toUpperCase()}</Text>
            <Text style={styles.title}>{offer.title}</Text>
            <Text style={styles.valid}>
              {active ? 'Valid today' : `Valid: ${offer.day}`}
            </Text>
            <Text style={styles.conditions}>{offer.conditions}</Text>
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
    overflow: 'hidden',
    padding: 16,
  },
  activeCard: {
    borderColor: colors.accentSoft,
    borderWidth: 1,
  },
  image: {
    alignSelf: 'center',
    borderRadius: spacing.radius,
    marginBottom: 14,
  },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accentSoft,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  valid: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 8,
  },
  conditions: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
});
