import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import QuestionBankScreen from '../screens/QuestionBankScreen';
import QuestionDetailScreen from '../screens/QuestionDetailScreen';
import InterviewScreen from '../screens/InterviewScreen';
import InterviewChatScreen from '../screens/InterviewChatScreen';
import WrongQuestionsScreen from '../screens/WrongQuestionsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InterviewHistoryScreen from '../screens/InterviewHistoryScreen';

import { colors } from '../utils/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: { [key: string]: string } = {
    Home: '🏠',
    Questions: '📚',
    Interview: '🎥',
    Wrong: '❌',
    Profile: '👤',
  };

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icons[name] || '📄'}
      </Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTintColor: colors.text,
        headerTitleStyle: styles.headerTitle,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '首页', headerShown: false }}
      />
      <Tab.Screen
        name="Questions"
        component={QuestionBankScreen}
        options={{ title: '题库' }}
      />
      <Tab.Screen
        name="Interview"
        component={InterviewScreen}
        options={{ title: '面试' }}
      />
      <Tab.Screen
        name="Wrong"
        component={WrongQuestionsScreen}
        options={{ title: '错题本' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: '我的' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: colors.text,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuestionDetail"
          component={QuestionDetailScreen}
          options={{ title: '题目详情' }}
        />
        <Stack.Screen
          name="InterviewChat"
          component={InterviewChatScreen}
          options={{ title: 'AI 模拟面试' }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: '收藏夹' }}
        />
        <Stack.Screen
          name="InterviewHistory"
          component={InterviewHistoryScreen}
          options={{ title: '面试记录' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBarBackground,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 85,
    paddingTop: 8,
    paddingBottom: 25,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  tabIconFocused: {
    opacity: 1,
  },
  header: {
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 17,
  },
});
