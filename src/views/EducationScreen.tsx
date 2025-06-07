import React from 'react';
import {ScrollView, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {AnimatedList} from '../components/AnimatedList';
import {Card} from '../components/Card';
import {SectionHeader} from '../components/SectionHeader';
import {useResume} from '../contexts/ResumeContext';
import {theme} from '../styles/theme';

interface Education {
  institution: string;
  degree: string;
  duration: string;
}

const EducationItem: React.FC<{education: Education; index: number}> = ({
  education,
}) => {
  return (
    <Card variant="default" animated>
      <Text style={styles.institution}>{education.institution}</Text>
      <Text style={styles.degree}>{education.degree}</Text>
      <Text style={styles.duration}>{education.duration}</Text>
    </Card>
  );
};

const EducationScreen = () => {
  const {resumeData} = useResume();

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Formation" subtitle="Mon parcours académique" />

      <AnimatedList
        data={resumeData.education}
        keyExtractor={item => item.institution}
        renderItem={(item, index) => (
          <EducationItem education={item} index={index} />
        )}
        style={styles.educationList}
        itemStyle={styles.educationItem}
        animation="slideUp"
        staggerDelay={150}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  educationList: ViewStyle;
  educationItem: ViewStyle;
  institution: TextStyle;
  degree: TextStyle;
  duration: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  educationList: {
    padding: theme.spacing.md,
  },
  educationItem: {
    marginBottom: theme.spacing.md,
  },
  institution: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  degree: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  duration: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
  },
});

export default EducationScreen;
