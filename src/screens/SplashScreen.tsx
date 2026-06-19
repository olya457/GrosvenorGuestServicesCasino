import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {images} from '../assets/images';
import {colors} from '../theme';

export function SplashScreen() {
  const {width} = useWindowDimensions();
  const logoSize = Math.min(width * 0.68, 280);

  return (
    <ImageBackground
      source={images.splashExterior}
      resizeMode="cover"
      style={styles.container}>
      <View style={styles.shadow} />
      <View style={styles.center}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={[
            styles.logo,
            {
              height: logoSize,
              width: logoSize,
            },
          ]}
        />
        <Text style={styles.title}>Grosvenor Guest{'\n'}Services Casino</Text>
        <Text style={styles.subtitle}>Quick Services For Guest</Text>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,10,24,0.26)',
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    borderRadius: 30,
    marginBottom: 28,
  },
  title: {
    color: colors.text,
    fontSize: 29,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 14,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 84,
  },
  dot: {
    backgroundColor: '#2f74f7',
    borderRadius: 8,
    height: 16,
    width: 16,
  },
});
