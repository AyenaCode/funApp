import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {AnimatedList} from '../components/AnimatedList';
import {Card} from '../components/Card';
import {Chip} from '../components/Chip';
import {SectionHeader} from '../components/SectionHeader';
import {useResume} from '../contexts/ResumeContext';
import {theme} from '../styles/theme';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
}

const ExperienceItem: React.FC<{experience: Experience; index: number}> = ({
  experience,
}) => {
  return (
    <Card variant="elevated" animated style={styles.experienceCard}>
      <View style={styles.headerRow}>
        <Text style={styles.company}>{experience.company}</Text>
        <Chip
          label={experience.duration}
          variant="outlined"
          style={styles.chip}
        />
      </View>
      <Text style={styles.position}>{experience.position}</Text>
      <View style={styles.descriptionList}>
        {experience.description.map((desc, i) => (
          <Text key={i} style={styles.descriptionItem}>
            • {desc}
          </Text>
        ))}
      </View>
    </Card>
  );
};

const ExperienceScreen = () => {
  const {resumeData} = useResume();

  return (
    <ScrollView style={styles.container}>
      <SectionHeader
        title="Expérience professionnelle"
        subtitle="Découvrez mon parcours et mes réalisations"
      />
      <AnimatedList<Experience>
        data={resumeData.experience}
        keyExtractor={item => item.id}
        renderItem={(item, index) => (
          <ExperienceItem experience={item} index={index} />
        )}
        style={styles.experienceList}
        itemStyle={styles.experienceItem}
        animation="slideUp"
        staggerDelay={180}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  experienceList: ViewStyle;
  experienceItem: ViewStyle;
  experienceCard: ViewStyle;
  headerRow: ViewStyle;
  company: TextStyle;
  chip: ViewStyle;
  position: TextStyle;
  descriptionList: ViewStyle;
  descriptionItem: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  experienceList: {
    padding: theme.spacing.md,
  },
  experienceItem: {
    marginBottom: theme.spacing.lg,
  },
  experienceCard: {
    marginBottom: theme.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  company: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  chip: {
    marginLeft: theme.spacing.sm,
  },
  position: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  descriptionList: {
    marginTop: theme.spacing.sm,
  },
  descriptionItem: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
});

export default ExperienceScreen;
