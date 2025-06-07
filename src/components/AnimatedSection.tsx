import React from 'react';
import {Animated, ViewStyle} from 'react-native';

interface AnimatedSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  animation?: 'fade' | 'slideUp' | 'scale';
  duration?: number;
}

export const AnimatedSection = ({
  children,
  style,
  delay = 0,
  animation = 'fade',
  duration = 500,
}: AnimatedSectionProps) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const getAnimationStyle = () => {
    switch (animation) {
      case 'slideUp':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      case 'scale':
        return {
          opacity: animatedValue,
          transform: [{scale: animatedValue}],
        };
      case 'fade':
      default:
        return {
          opacity: animatedValue,
        };
    }
  };

  return (
    <Animated.View style={[style, getAnimationStyle()]}>
      {children}
    </Animated.View>
  );
};
