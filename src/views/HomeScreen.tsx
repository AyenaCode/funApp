import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AnimatedSection} from '../components/AnimatedSection';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {useResume} from '../contexts/ResumeContext';
import {RootStackParamList} from '../navigation/AppNavigator';
import {theme} from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItemProps {
  title: string;
  onPress: () => void;
  index: number;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {resumeData} = useResume();

  const MenuItem: React.FC<MenuItemProps> = ({title, onPress, index}) => (
    <AnimatedSection animation="slideUp" delay={index * 100}>
      <Button
        title={title}
        onPress={onPress}
        variant="primary"
        size="large"
        style={styles.menuButton}
      />
    </AnimatedSection>
  );

  const menuItems = [
    {title: 'Expérience', route: 'Experience'},
    {title: 'Compétences', route: 'Skills'},
    {title: 'Formation', route: 'Education'},
    {title: 'Contact', route: 'Contact'},
  ] as const;

  return (
    <ScrollView style={styles.container}>
      <AnimatedSection animation="fade" duration={1000}>
        <Card variant="default" style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require('../assets/images.jpeg')}
              style={styles.avatar}
            />
            <Text style={styles.name}>{resumeData.personalInfo.name}</Text>
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          </View>
          <Text style={styles.bio}>{resumeData.personalInfo.bio}</Text>
        </Card>
      </AnimatedSection>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.route}
            title={item.title}
            onPress={() =>
              navigation.navigate(item.route as keyof RootStackParamList)
            }
            index={index}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    margin: theme.spacing.md,
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.large,
  },
  profileContainer: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: theme.spacing.md,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  name: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  bio: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  menu: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  menuButton: {
    width: '100%',
  },
});

export default HomeScreen;
