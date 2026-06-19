import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, spacing} from '../theme';
import type {TabKey} from '../types/app';

type FloatingTabBarProps = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

const tabs: Array<{key: TabKey; icon: string; label: string}> = [
  {key: 'home', icon: '🏠', label: 'Home'},
  {key: 'requests', icon: '🔔', label: 'Requests'},
  {key: 'dining', icon: '🍴', label: 'Dining'},
  {key: 'venues', icon: '🏢', label: 'Venues'},
  {key: 'offers', icon: '🏷️', label: 'Offers'},
  {key: 'climate', icon: '🌡️', label: 'Climate'},
];

export function FloatingTabBar({activeTab, onTabPress}: FloatingTabBarProps) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.panel}>
        {tabs.map(tab => {
          const active = activeTab === tab.key;

          return (
            <Pressable
              accessibilityLabel={tab.label}
              key={tab.key}
              onPress={() => onTabPress(tab.key)}
              style={styles.item}>
              <View style={[styles.iconWrap, active && styles.activeIconWrap]}>
                <Text style={[styles.icon, active && styles.activeIcon]}>
                  {tab.icon}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    bottom: spacing.tabBottom,
    left: spacing.screenX,
    position: 'absolute',
    right: spacing.screenX,
  },
  panel: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    flexDirection: 'row',
    height: spacing.tabHeight,
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 12,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  activeIconWrap: {
    backgroundColor: colors.accent,
  },
  icon: {
    fontSize: 22,
    lineHeight: 28,
  },
  activeIcon: {
    color: colors.text,
  },
});
