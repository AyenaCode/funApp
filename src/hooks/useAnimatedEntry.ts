import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

interface AnimationConfig {
  type: 'fade' | 'scale' | 'slideUp';
  duration?: number;
  delay?: number;
}

export const useAnimatedEntry = (config: AnimationConfig) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationConfig = {
      toValue: 1,
      duration: config.duration || 500,
      delay: config.delay || 0,
      useNativeDriver: true,
    };

    switch (config.type) {
      case 'fade':
        Animated.timing(animation, animationConfig).start();
        break;
      case 'scale':
        Animated.spring(animation, {
          ...animationConfig,
          tension: 50,
          friction: 7,
        }).start();
        break;
      case 'slideUp':
        Animated.timing(animation, animationConfig).start();
        break;
    }
  }, []);

  const getAnimationStyle = () => {
    switch (config.type) {
      case 'fade':
        return {
          opacity: animation,
        };
      case 'scale':
        return {
          opacity: animation,
          transform: [{scale: animation}],
        };
      case 'slideUp':
        return {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };
      default:
        return {};
    }
  };

  return getAnimationStyle();
};
