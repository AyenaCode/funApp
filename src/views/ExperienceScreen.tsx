import React from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useResume} from '../contexts/ResumeContext';
import {theme} from '../styles/theme';

const ExperienceScreen = () => {
  const {resumeData} = useResume();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {resumeData.experience.map((exp, index) => (
        <Animated.View
          key={exp.id}
          style={[
            styles.experienceCard,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.company}>{exp.company}</Text>
          <Text style={styles.position}>{exp.position}</Text>
          <Text style={styles.duration}>{exp.duration}</Text>
          <View style={styles.descriptionContainer}>
            {exp.description.map((desc, i) => (
              <Text key={i} style={styles.descriptionItem}>
                • {desc}
              </Text>
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
  experienceCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  company: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  position: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  duration: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  descriptionContainer: {
    marginTop: theme.spacing.sm,
  },
  descriptionItem: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
});

export default ExperienceScreen;
