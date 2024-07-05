import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  title: string;
  onPress: () => void;
  containerClassName?: string;
  textClassName?: string;
  isLoading?: boolean;
}

const Button = ({
  title,
  onPress,
  containerClassName,
  textClassName,
  isLoading
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={clsx(
        'bg-secondary rounded-xl min-h-[62px] justify-center items-center',
        isLoading && 'opacity-50',
        containerClassName
      )}
      disabled={isLoading}
    >
      <Text className={clsx('text-primary font-psemibold text-lg', textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
