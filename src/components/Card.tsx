import React from 'react';
import {Animated, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {theme} from '../styles/theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
  animated?: boolean;
  animationDuration?: number;
}

export const Card = ({
  children,
  style,
  variant = 'default',
  animated = false,
  animationDuration = 500,
}: CardProps) => {
  const fadeAnim = React.useRef(new Animated.Value(animated ? 0 : 1)).current;
  const scaleAnim = React.useRef(
    new Animated.Value(animated ? 0.95 : 1),
  ).current;

  React.useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animated, animationDuration]);

  const getCardStyle = React.useMemo(() => {
    const baseStyle = [styles.card];

    switch (variant) {
      case 'elevated':
        baseStyle.push(styles.elevatedCard);
        break;
      case 'outlined':
        baseStyle.push(styles.outlinedCard);
        break;
      default:
        baseStyle.push(styles.defaultCard);
    }

    return baseStyle;
  }, [variant]);

  const Container = animated ? Animated.View : View;
  const animatedStyle = animated
    ? {
        opacity: fadeAnim,
        transform: [{scale: scaleAnim}],
      }
    : {};

  return (
    <Container style={[...getCardStyle, style, animatedStyle]}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create<{
  card: ViewStyle;
  defaultCard: ViewStyle;
  elevatedCard: ViewStyle;
  outlinedCard: ViewStyle;
}>({
  card: {
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  defaultCard: {
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  elevatedCard: {
    shadowColor: theme.colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
