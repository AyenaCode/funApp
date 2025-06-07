import React from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useResume} from '../contexts/ResumeContext';
import {theme} from '../styles/theme';

const SkillsScreen = () => {
  const {resumeData} = useResume();
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {resumeData.skills.map((skillCategory, index) => (
        <Animated.View
          key={skillCategory.category}
          style={[
            styles.categoryCard,
            {
              opacity: scaleAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <Text style={styles.categoryTitle}>{skillCategory.category}</Text>
          <View style={styles.skillsContainer}>
            {skillCategory.items.map((skill, skillIndex) => (
              <View key={skillIndex} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  categoryCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  categoryTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  skillBadge: {
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  skillText: {
    ...theme.typography.body,
    color: theme.colors.secondary,
  },
});

export default SkillsScreen;
