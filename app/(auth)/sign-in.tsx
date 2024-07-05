import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { images } from '@/constants';
import Button from '@/components/Button';
import { Link } from 'expo-router';
import FormField from '@/components/FormField';

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Please enter a valid email address in the format example@example.com.'),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required.' })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
});

type SignIn = z.infer<typeof schema>;

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignIn>({ resolver: zodResolver(schema) });

  const onSubmit = (data: SignIn) => console.log(data);

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            height: '100%',
            display: 'flex'
          }}
        >
          <View className="w-full flex min-h-[85vh] justify-center px-4 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px]" />
            <Text className="text-2xl text-white mt-10 font-psemibold ">
              Sign Up to Aora
            </Text>

            <FormField<SignIn>
              control={control}
              name="email"
              placeholder="Email"
              containerClassName="mt-7"
            />
            <FormField<SignIn>
              control={control}
              name="password"
              placeholder="Password"
              containerClassName="mt-7"
            />

            <Button
              title="Sign In"
              onPress={handleSubmit(onSubmit)}
              containerClassName="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Don&apos;t have an account?{' '}
                <Link
                  href="/sign-up"
                  className="text-lg font-semibold text-secondary-100"
                >
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
