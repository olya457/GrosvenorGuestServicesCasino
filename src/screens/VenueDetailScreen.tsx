import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {colors, spacing, typography} from '../theme';
import type {Venue} from '../types/app';

type VenueDetailScreenProps = {
  venue: Venue;
  onBack: () => void;
};

export function VenueDetailScreen({venue, onBack}: VenueDetailScreenProps) {
  const {width} = useWindowDimensions();
  const imageSize = Math.min(300, width - spacing.screenX * 2);

  const callVenue = () => {
    const phone = venue.phone.replace(/[^\d+]/g, '');
    Linking.openURL(`tel:${phone}`).catch(() => undefined);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <Text style={styles.title}>{venue.title}</Text>
      </View>
      <Image
        source={venue.image}
        resizeMode="contain"
        style={[styles.hero, {height: imageSize, width: imageSize}]}
      />
      <Text style={styles.meta}>{venue.hours}</Text>
      <Text style={styles.meta}>{venue.phone}</Text>
      <Text style={styles.paragraph}>{venue.expandedDescription[0]}</Text>
      <Text style={styles.paragraph}>{venue.expandedDescription[1]}</Text>
      <View style={styles.mapWrap}>
        <MapView
          initialRegion={{
            latitude: venue.coordinate.latitude,
            longitude: venue.coordinate.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          scrollEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          style={styles.map}>
          <Marker
            coordinate={venue.coordinate}
            title={venue.title}
            description={venue.shortDescription}
          />
        </MapView>
      </View>
      <AppButton label="Call Venue" onPress={callVenue} style={styles.button} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
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
    flex: 1,
    fontSize: typography.title,
    fontWeight: '700',
  },
  hero: {
    alignSelf: 'center',
    borderRadius: spacing.radius,
    marginBottom: 18,
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  paragraph: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 20,
  },
  mapWrap: {
    borderColor: colors.border,
    borderRadius: spacing.radius,
    borderWidth: 1,
    height: 150,
    marginTop: 22,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    marginTop: 18,
  },
});
