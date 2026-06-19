import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {venues} from '../data/resortData';
import {colors, spacing, typography} from '../theme';
import type {Venue} from '../types/app';

type VenuesScreenProps = {
  onOpenVenue: (venue: Venue) => void;
};

export function VenuesScreen({onOpenVenue}: VenuesScreenProps) {
  const {width} = useWindowDimensions();
  const imageSize = Math.min(300, width - spacing.screenX * 2 - 32);

  return (
    <Screen title="Venues">
      {venues.map(venue => (
        <View key={venue.id} style={styles.card}>
          <Image
            source={venue.image}
            resizeMode="contain"
            style={[styles.image, {height: imageSize, width: imageSize}]}
          />
          <Text style={styles.title}>{venue.title}</Text>
          <Text style={styles.meta}>{venue.hours}</Text>
          <Text style={styles.meta}>{venue.phone}</Text>
          <Text style={styles.description}>{venue.shortDescription}</Text>
          <AppButton
            label="Open Venue"
            onPress={() => onOpenVenue(venue)}
            style={styles.button}
          />
        </View>
      ))}
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
    borderRadius: spacing.radius,
    marginBottom: 14,
  },
  title: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 7,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  button: {
    marginTop: 14,
  },
});
