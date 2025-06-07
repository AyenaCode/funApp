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
    bio: 'Je conçois des solutions mobiles performantes, qu’elles soient natives ou multiplateformes, pour maximiser la valeur utilisateur.',
    contact: {
      email: 'ayenacode1@gmail.com',
      phone: '+228 93 36 71 57',
      location: 'Lome, Togo',
    },
  },
  experience: [],
  skills: [],
  education: [],
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
