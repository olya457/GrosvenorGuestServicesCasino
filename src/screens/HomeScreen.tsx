import React, {useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {images} from '../assets/images';
import {AppButton} from '../components/AppButton';
import {Screen} from '../components/Screen';
import {offers} from '../data/resortData';
import {colors, spacing, typography} from '../theme';

type HomeScreenProps = {
  doNotDisturb: boolean;
  onToggleDoNotDisturb: (value: boolean) => void;
  onOpenOffers: () => void;
};

export function HomeScreen({
  doNotDisturb,
  onToggleDoNotDisturb,
  onOpenOffers,
}: HomeScreenProps) {
  const [conciergeCalled, setConciergeCalled] = useState(false);
  const {width} = useWindowDimensions();
  const contentWidth = width - spacing.screenX * 2;
  const heroWidth = Math.min(393, contentWidth);
  const heroHeight = Math.min(210, Math.max(154, heroWidth / (393 / 190)));
  const offerImageSize = Math.min(300, contentWidth - 32);
  const currentOffer = useMemo(() => {
    const day = new Date().getDay();
    return offers.find(offer => offer.dayIndex === day) ?? offers[0];
  }, []);

  const handleEmergency = () => {
    setConciergeCalled(true);
    Alert.alert('Emergency Concierge', 'Concierge has been notified.');
  };

  return (
    <Screen title="Home">
      <Image
        source={images.homeExterior}
        resizeMode="cover"
        style={[styles.hero, {height: heroHeight, width: heroWidth}]}
      />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>YOUR RESERVATION</Text>
        <InfoRow label="Guest" value="James Harrington" />
        <InfoRow label="Reservation" value="#GR-2847591" />
        <InfoRow label="Room" value="412 - Executive Suite" />
        <InfoRow label="Check-in" value="18 Jun 2026" />
        <InfoRow label="Check-out" value="22 Jun 2026" />
      </View>
      <View style={[styles.card, styles.dndCard]}>
        <View>
          <Text style={styles.cardTitle}>Do Not Disturb</Text>
          <Text style={styles.muted}>
            {doNotDisturb ? 'Active - Room is private' : 'Inactive'}
          </Text>
        </View>
        <Switch
          value={doNotDisturb}
          onValueChange={onToggleDoNotDisturb}
          thumbColor={colors.text}
          trackColor={{false: colors.surfaceSoft, true: colors.accentSoft}}
        />
      </View>
      <AppButton
        label={conciergeCalled ? 'Concierge Notified' : 'Emergency Concierge'}
        onPress={handleEmergency}
        style={styles.concierge}
        variant={conciergeCalled ? 'primary' : 'secondary'}
      />
      <Pressable onPress={onOpenOffers} style={styles.offerCard}>
        <Image
          source={currentOffer.image}
          resizeMode="contain"
          style={[
            styles.offerImage,
            {height: offerImageSize, width: offerImageSize},
          ]}
        />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SPECIAL OFFER</Text>
        </View>
        <Text style={styles.eyebrow}>{currentOffer.venue.toUpperCase()}</Text>
        <Text style={styles.cardTitle}>{currentOffer.title}</Text>
        <Text style={styles.muted}>Valid: {currentOffer.day}</Text>
        <Text style={styles.offerText}>{currentOffer.conditions}</Text>
      </Pressable>
    </Screen>
  );
}

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignSelf: 'center',
    borderRadius: spacing.radius,
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    marginBottom: 12,
    padding: 16,
  },
  dndCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 12,
  },
  cardTitle: {
    color: colors.text,
    fontSize: typography.heading,
    fontWeight: '700',
  },
  muted: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 14,
  },
  infoValue: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  concierge: {
    marginBottom: 12,
  },
  offerCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radius,
    overflow: 'hidden',
    padding: 16,
  },
  offerImage: {
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
  offerText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
});
