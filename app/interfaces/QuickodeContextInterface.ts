import {ToastPosition} from '@backpackapp-io/react-native-toast';

export interface QuickodeContextInterface {
  isLoading: boolean;
  isAuthenticated: boolean;
  toggleAppError: (
    isVisible: boolean,
    title?: string,
    description?: string,
  ) => void;
  toggleBottomSheet: (
    isVisible: boolean,
    snapPoints?: string[],
    children?: React.ReactNode,
    bottomSheetProps?: {
      enableDismissOnClose: boolean;
      enableContentPanningGesture: boolean;
      enableHandlePanningGesture: boolean;
    },
  ) => void;
  setToast: (
    message?: string,
    options?: {
      duration?: number;
      position?: ToastPosition;
      icon?: string;
      styles?: {
        view?: any;
        pressable?: any;
        text?: any;
        indicator?: any;
      };
    },
  ) => void;
  toggleLanguage: (language: string) => void;
}
