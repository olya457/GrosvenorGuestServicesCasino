import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {defaultClimate, defaultQuickRequestState} from '../data/resortData';
import {ClimateScreen} from '../screens/ClimateScreen';
import {DiningScreen} from '../screens/DiningScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {OffersScreen} from '../screens/OffersScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {OrderScreen} from '../screens/OrderScreen';
import {QuickRequestsScreen} from '../screens/QuickRequestsScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {VenueDetailScreen} from '../screens/VenueDetailScreen';
import {VenuesScreen} from '../screens/VenuesScreen';
import {colors} from '../theme';
import type {CartItem, ClimateSettings, TabKey, Venue} from '../types/app';
import {
  readBoolean,
  storageKeys,
  useStoredState,
  writeBoolean,
} from '../storage/persistedState';

type MainRoute =
  | {name: 'tabs'}
  | {name: 'order'}
  | {name: 'venueDetail'; venue: Venue};

export function AppNavigator() {
  const [booted, setBooted] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(true);

  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const minimumSplash = new Promise(resolve => {
      timeoutId = setTimeout(resolve, 5000);
    });

    Promise.all([
      readBoolean(storageKeys.onboardingComplete, false),
      minimumSplash,
    ]).then(([complete]) => {
      if (!mounted) {
        return;
      }

      setNeedsOnboarding(!complete);
      setBooted(true);
    });

    return () => {
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const completeOnboarding = () => {
    writeBoolean(storageKeys.onboardingComplete, true).finally(() =>
      setNeedsOnboarding(false),
    );
  };

  if (!booted) {
    return <SplashScreen />;
  }

  if (needsOnboarding) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  return <MainNavigator />;
}

function MainNavigator() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [route, setRoute] = useState<MainRoute>({name: 'tabs'});
  const [doNotDisturb, setDoNotDisturb] = useStoredState(
    storageKeys.doNotDisturb,
    false,
  );
  const [quickStates, setQuickStates] = useStoredState(
    storageKeys.quickRequests,
    defaultQuickRequestState,
  );
  const [cart, setCart] = useStoredState<CartItem[]>(storageKeys.cart, []);
  const [climate, setClimate] = useStoredState<ClimateSettings>(
    storageKeys.climate,
    defaultClimate,
  );
  const normalizedQuickStates = useMemo(
    () => ({...defaultQuickRequestState, ...quickStates}),
    [quickStates],
  );

  const openTab = (tab: TabKey) => {
    setActiveTab(tab);
    setRoute({name: 'tabs'});
  };

  const renderRoute = () => {
    if (route.name === 'order') {
      return (
        <OrderScreen
          cart={cart}
          onBack={() => setRoute({name: 'tabs'})}
          onCartChange={setCart}
        />
      );
    }

    if (route.name === 'venueDetail') {
      return (
        <VenueDetailScreen
          venue={route.venue}
          onBack={() => setRoute({name: 'tabs'})}
        />
      );
    }

    switch (activeTab) {
      case 'requests':
        return (
          <QuickRequestsScreen
            states={normalizedQuickStates}
            onChange={setQuickStates}
          />
        );
      case 'dining':
        return (
          <DiningScreen
            cart={cart}
            onCartChange={setCart}
            onOpenOrder={() => setRoute({name: 'order'})}
          />
        );
      case 'venues':
        return (
          <VenuesScreen
            onOpenVenue={venue => {
              setActiveTab('venues');
              setRoute({name: 'venueDetail', venue});
            }}
          />
        );
      case 'offers':
        return <OffersScreen />;
      case 'climate':
        return <ClimateScreen settings={climate} onApply={setClimate} />;
      case 'home':
      default:
        return (
          <HomeScreen
            doNotDisturb={doNotDisturb}
            onOpenOffers={() => openTab('offers')}
            onToggleDoNotDisturb={setDoNotDisturb}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderRoute()}
      <FloatingTabBar activeTab={activeTab} onTabPress={openTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
