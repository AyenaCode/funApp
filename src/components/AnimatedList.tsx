import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {AnimatedSection} from './AnimatedSection';

interface AnimatedListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  animation?: 'fade' | 'slideUp' | 'scale';
  staggerDelay?: number;
}

export function AnimatedList<T>({
  data,
  renderItem,
  keyExtractor,
  style,
  itemStyle,
  animation = 'slideUp',
  staggerDelay = 100,
}: AnimatedListProps<T>) {
  return (
    <View style={[styles.container, style]}>
      {data.map((item, index) => (
        <AnimatedSection
          key={keyExtractor(item)}
          animation={animation}
          delay={index * staggerDelay}
          style={itemStyle}>
          {renderItem(item, index)}
        </AnimatedSection>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
