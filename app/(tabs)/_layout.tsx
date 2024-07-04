import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '@/constants';

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const tabs = [
  {
    name: 'Home',
    title: 'Home',
    slug: 'home',
    icon: icons.home
  },
  {
    name: 'Bookmark',
    title: 'Bookmark',
    slug: 'bookmark',
    icon: icons.bookmark
  },
  {
    name: 'Create',
    title: 'Create',
    slug: 'create',
    icon: icons.plus
  },
  {
    name: 'Profile',
    title: 'Profile',
    slug: 'profile',
    icon: icons.profile
  }
] as const;

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View className="items-center justify-center gap-2">
    <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
    <Text
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color }}
    >
      {name}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >
        {tabs.map(({ name, title, slug, icon }) => (
          <Tabs.Screen
            name={slug}
            options={{
              title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon icon={icon} color={color} name={name} focused={focused} />
              )
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
