import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    contact: {
      email: string;
      phone: string;
      location: string;
    };
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
  }>;
}

interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonalInfo: (info: typeof initialState.personalInfo) => void;
  updateExperience: (exp: typeof initialState.experience) => void;
  updateSkills: (skills: typeof initialState.skills) => void;
  updateEducation: (edu: typeof initialState.education) => void;
}

const initialState: ResumeData = {
  personalInfo: {
    name: 'Ayena TCHIKPE',
    title: 'Développeur Mobile Senior',
    bio: 'Développeur produit spécialisé en React Native et Android (Java/Kotlin), je conçois des solutions digitales performantes, qu’elles soient natives ou multiplateformes, pour maximiser la valeur utilisateur et répondre efficacement aux enjeux business.',
    contact: {
      email: 'ayenacode1@gmail.com',
      phone: '+228 93 36 71 57',
      location: 'Lome, Togo',
    },
  },
  experience: [
    {
      id: 'moon-togo',
      company: 'MOON TOGO',
      position: 'Développeur Mobile Senior',
      duration: 'Février 2025 - Aujourd’hui',
      description: [
        "Ajout de nouvelles fonctionnalités et optimisation de l'application mobile métier.",
        "Intégration de modules natifs pour connecter l'app aux kits solaires (gestion de code, synchronisation, etc.)",
        "Collaboration avec les équipes produit et terrain pour améliorer l'expérience utilisateur des agents.",
        'Développement de solutions pour la gestion du recouvrement, paiements, renouvellements et interactions clients.',
        'Contribution à la digitalisation des processus de commercialisation de kits solaires à crédit et services associés.',
        'Optimisation des performances et de la fiabilité de l’application sur le terrain (connectivité, synchronisation, sécurité).',
      ],
    },
    {
      id: 'lyfood',
      company: 'Lyfood',
      position: 'Développeur Mobile',
      duration: '2024',
      description: [
        'Création et évolution de l’application client pour la commande, la livraison et la gestion de stock.',
        'Refonte de l’architecture pour améliorer la scalabilité et la maintenabilité.',
        'Mise en place d’une expérience utilisateur fluide et intuitive pour fidéliser les clients.',
        'Développement de modules de suivi de commande en temps réel et notifications push.',
        'Collaboration avec les équipes métier pour adapter l’application aux besoins du marché.',
      ],
    },
    {
      id: 'freelance',
      company: 'Freelance',
      position: 'Développeur Mobile & Product Builder',
      duration: 'Depuis 2023',
      description: [
        "Accompagnement de startups et PME dans la conception et le lancement d'applications mobiles innovantes.",
        'Développement de MVP robustes et évolutifs pour valider rapidement les idées business.',
        "Optimisation de l'expérience utilisateur et intégration de parcours interactifs pour maximiser la rétention.",
        'Mise en place de solutions sur-mesure : paiement mobile, notifications push, synchronisation offline, analytics avancées.',
        'Collaboration avec des équipes pluridisciplinaires (design, produit, marketing) pour transformer les besoins métiers en solutions digitales concrètes.',
        'Veille technologique et adoption des meilleures pratiques pour garantir la performance, la sécurité et la scalabilité des projets livrés.',
      ],
    },
  ],
  skills: [
    {
      category: 'Développement Mobile',
      items: [
        'React Native (avancé)',
        'Modules natifs Android (Java/Kotlin)',
        'Jetpack Compose',
        'Kotlin',
        'Java',
        'Intégration de SDK et APIs mobiles',
        'Optimisation des performances mobiles',
      ],
    },
    {
      category: 'Product & UX',
      items: [
        'Product Developer',
        'Approche orientée produit',
        'Conception de parcours utilisateur engageants',
        'Amélioration continue de l’expérience utilisateur',
        'Résolution de problèmes complexes',
        'Collaboration pluridisciplinaire',
        'Analyse des besoins métier',
      ],
    },
    {
      category: 'Soft Skills',
      items: [
        'Esprit d’initiative',
        'Créativité',
        'Communication',
        'Autonomie',
        'Veille technologique',
        'Adaptabilité',
      ],
    },
  ],
  education: [
    {
      institution: 'Lycée scientifique',
      degree: 'Baccalauréat second degré série D (Mention Bien)',
      duration: 'En 2017',
    },
    {
      institution: 'Université de Lomé',
      degree: 'Licence 1 & 2 - Sciences Mathématiques et Technologie',
      duration: 'De 2017 à 2019',
    },
    {
      institution: 'Autodidacte & Bootcamps',
      degree: 'Développement Mobile & Web (React Native, Android, Product, UX)',
      duration: 'Depuis 2020',
    },
    {
      institution: 'Formations & veille technologique',
      degree: 'OpenClassrooms, Udemy, YouTube, Google, etc.',
      duration: '2020 - Aujourd’hui',
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialState);

  const updatePersonalInfo = (info: typeof initialState.personalInfo) => {
    setResumeData(prev => ({...prev, personalInfo: info}));
  };

  const updateExperience = (exp: typeof initialState.experience) => {
    setResumeData(prev => ({...prev, experience: exp}));
  };

  const updateSkills = (skills: typeof initialState.skills) => {
    setResumeData(prev => ({...prev, skills}));
  };

  const updateEducation = (edu: typeof initialState.education) => {
    setResumeData(prev => ({...prev, education: edu}));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        updateExperience,
        updateSkills,
        updateEducation,
      }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
