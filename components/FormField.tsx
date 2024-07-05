import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import clsx from 'clsx';
import { icons } from '@/constants';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  containerClassName?: string;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  containerClassName
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error, isTouched, isDirty },
        formState: { isSubmitted }
      }) => (
        <View className={clsx('space-y-2', containerClassName)}>
          <Text className="text-base text-gray-100 font-pmedium">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 items-center flex-row">
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 text-white font-psemibold text-base"
              placeholder={placeholder}
              placeholderTextColor="#7b7b8b"
              secureTextEntry={name === 'password' && !showPassword}
              {...(name === 'email'
                ? { keyboardType: 'email-address', autoCapitalize: 'none' }
                : {})}
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

          {error && <Text className="text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default FormField;
