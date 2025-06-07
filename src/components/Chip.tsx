import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {theme} from '../styles/theme';

interface ChipProps {
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onPress,
  variant = 'default',
  color = theme.colors.primary,
  style,
  textStyle,
  disabled = false,
}) => {
  const getContainerStyle = (): ViewStyle[] => {
    const baseStyle = [styles.container] as ViewStyle[];

    const variantStyle: ViewStyle = {
      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: color,
        backgroundColor: 'transparent',
      }),
      ...(variant === 'filled' && {
        backgroundColor: color,
      }),
      ...(variant === 'default' && {
        backgroundColor: color + '20',
      }),
    };

    baseStyle.push(variantStyle);

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    if (variant === 'filled') {
      baseStyle.push({color: theme.colors.background});
    } else {
      baseStyle.push({color});
    }

    if (disabled) {
      baseStyle.push(styles.disabledText);
    }

    return baseStyle;
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[...getContainerStyle(), style]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Text style={[...getTextStyle(), textStyle]}>{label}</Text>
    </Container>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  text: TextStyle;
  disabled: ViewStyle;
  disabledText: TextStyle;
}>({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.large,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.8,
  },
});
