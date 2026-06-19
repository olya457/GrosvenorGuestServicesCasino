import React, {useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {onboardingSlides} from '../data/resortData';
import {colors, spacing} from '../theme';

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({onComplete}: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);
  const slide = onboardingSlides[index];
  const last = index === onboardingSlides.length - 1;

  const handleNext = () => {
    if (last) {
      onComplete();
      return;
    }

    setIndex(current => current + 1);
  };

  return (
    <ImageBackground source={slide.image} resizeMode="cover" style={styles.bg}>
      <View style={styles.topShade} />
      <View style={styles.content}>
        <Text style={styles.count}>
          {index + 1} OF {onboardingSlides.length}
        </Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <View style={styles.progressRow}>
          {onboardingSlides.map((item, itemIndex) => (
            <View
              key={item.title}
              style={[
                styles.progress,
                itemIndex <= index && styles.progressActive,
              ]}
            />
          ))}
        </View>
        <Pressable onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>{slide.buttonLabel}</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  topShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  content: {
    paddingBottom: spacing.tabBottom + 22,
    paddingHorizontal: 28,
  },
  count: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 0,
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 17,
    lineHeight: 24,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 30,
  },
  progress: {
    backgroundColor: 'rgba(255,255,255,0.26)',
    flex: 1,
    height: 3,
  },
  progressActive: {
    backgroundColor: colors.accentSoft,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: spacing.radius,
    height: 58,
    justifyContent: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
