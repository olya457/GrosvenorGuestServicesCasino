import React, {ReactNode} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {colors, spacing, typography} from '../theme';

type ScreenProps = {
  title?: string;
  children: ReactNode;
  hasTabBar?: boolean;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  headerRight?: ReactNode;
};

export function Screen({
  title,
  children,
  hasTabBar = true,
  scroll = true,
  contentStyle,
  headerRight,
}: ScreenProps) {
  const bottomPadding = hasTabBar
    ? spacing.tabHeight + spacing.tabBottom + 24
    : spacing.tabBottom + 30;
  const content = (
    <View
      style={[
        styles.content,
        {
          paddingTop: spacing.top,
          paddingBottom: bottomPadding,
        },
        contentStyle,
      ]}>
      {title ? (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {headerRight}
        </View>
      ) : null}
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
        translucent={false}
      />
      {scroll ? (
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenX,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    minHeight: 36,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
  },
});
