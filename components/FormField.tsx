import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import clsx from 'clsx';
import { icons } from '@/constants';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder?: string;
  containerClassName?: string;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  containerClassName
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={clsx('space-y-2', containerClassName)}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, isTouched, isDirty }
        }) => (
          <View className={clsx('space-y-2')}>
            <Text className="text-base text-gray-100 font-pmedium">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row">
              <TextInput
                className="flex-1 text-white font-psemibold text-base"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                secureTextEntry={name === 'password' && !showPassword}
                {...(name === 'email' ? { keyboardType: 'email-address' } : {})}
              />

              {name === 'password' && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>

            {error && isTouched && isDirty && (
              <Text style={{ color: 'red' }}>{error.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default FormField;
