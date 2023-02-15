import i18n from 'i18n-js';
import {ITheme} from './theme';

export * from './components';
export * from './theme';

export interface IUser {
  id: string;
  avatar: string;
  fullName: string;
  phoneNumber: string;
  type: string;
  stats: {
    jobsDone: number;
    rating: number;
  };
  skills: {
    skillId: number;
    skillName: string;
  };
  github: string;
  linkedin: string;
}

export interface ICard {
  cardId: string;
  cardName: string;
  cardPicture: string;
  type: string;
}
export interface ICategory {
  id?: number;
  name?: string;
}

export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}
export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  user: IUser;
  users: IUser[];
  handleUser: (data?: IUser) => void;
  handleUsers: (data?: IUser[]) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  createdAt?: number | Date;
  type: 'approve' | 'reject' | 'chat' | 'notification';
}
