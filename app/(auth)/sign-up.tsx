import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
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
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required.' })
    .regex(/^[A-Za-z\d_-]{3,20}$/, {
      message:
        'Username can only contain letters, digits, underscores, and hyphens, and must be between 3 and 20 characters long.'
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .email('Please enter a valid email address in the format example@example.com.'),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required.' })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character from the set @$!%?&.'
    })
});

type SignUp = z.infer<typeof schema>;

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUp>({ resolver: zodResolver(schema) });

  const onSubmit = (data: SignUp) => console.log(data);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: '100%',
          display: 'flex'
        }}
      >
        <View className="w-full flex min-h-[85vh] justify-center px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px]" />
          <Text className="text-2xl text-white mt-10 font-psemibold ">
            Login in to Aora
          </Text>

          <FormField<SignUp>
            control={control}
            name="username"
            placeholder="Username"
            containerClassName="mt-7"
          />
          <FormField<SignUp>
            control={control}
            name="email"
            placeholder="Email"
            containerClassName="mt-7"
          />
          <FormField<SignUp>
            control={control}
            name="password"
            placeholder="Password"
            containerClassName="mt-7"
          />

          <Button
            title="Sign Up"
            onPress={handleSubmit(onSubmit)}
            containerClassName="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?{' '}
              <Link href="/sign-in" className="text-lg font-semibold text-secondary-100">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
