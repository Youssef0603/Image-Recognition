/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';
import Main from './app/Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QuickodeProvider} from './app/contexts/Quickode';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import i18n from './app/i18n';

const App = (props: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 1}},
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
              <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                  <QuickodeProvider>
                    <Main />
                  </QuickodeProvider>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </QueryClientProvider>
          </I18nextProvider>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
