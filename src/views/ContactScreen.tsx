import React from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {AnimatedList} from '../components/AnimatedList';
import {AnimatedSection} from '../components/AnimatedSection';
import {Card} from '../components/Card';
import {SectionHeader} from '../components/SectionHeader';
import {useResume} from '../contexts/ResumeContext';
import {theme} from '../styles/theme';

interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  onPress?: () => void;
}

interface ContactData extends ContactItemProps {}

const ContactItem: React.FC<ContactItemProps> = ({label, value, onPress}) => {
  return (
    <AnimatedSection animation="scale" duration={500}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.touchable}>
        <Card variant="elevated">
          <Text style={styles.contactLabel}>{label}</Text>
          <Text style={styles.contactValue}>{value}</Text>
        </Card>
      </TouchableOpacity>
    </AnimatedSection>
  );
};

const ContactScreen: React.FC = () => {
  const {resumeData} = useResume();
  const {contact} = resumeData.personalInfo;

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contact.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  const handleLocationPress = () => {
    Linking.openURL(
      `https://maps.google.com/?q=${encodeURIComponent(contact.location)}`,
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Contact" subtitle="N'hésitez pas à me contacter" />

      <AnimatedList<ContactData>
        data={[
          {
            icon: 'email',
            label: 'Email',
            value: contact.email,
            onPress: handleEmailPress,
          },
          {
            icon: 'phone',
            label: 'Téléphone',
            value: contact.phone,
            onPress: handlePhonePress,
          },
          {
            icon: 'location',
            label: 'Localisation',
            value: contact.location,
            onPress: handleLocationPress,
          },
        ]}
        keyExtractor={(item: ContactData) => item.label}
        renderItem={(item: ContactData, index: number) => (
          <ContactItem
            icon={item.icon}
            label={item.label}
            value={item.value}
            onPress={item.onPress}
          />
        )}
        style={styles.contactList}
        itemStyle={styles.contactItem}
        animation="slideUp"
        staggerDelay={150}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  contactList: ViewStyle;
  contactItem: ViewStyle;
  touchable: ViewStyle;
  contactLabel: TextStyle;
  contactValue: TextStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contactList: {
    padding: theme.spacing.md,
  },
  contactItem: {
    marginBottom: theme.spacing.md,
  },
  touchable: {
    width: '100%',
  },
  contactLabel: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  contactValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
});

export default ContactScreen;
