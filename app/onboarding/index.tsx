import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, OnboardingCard, PaginationDots } from '../../components';
import { useAuth } from '../../contexts';
import { ONBOARDING_DATA } from '../../lib';

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuth();

  const handleNext = async () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Complete onboarding and navigate to login
      await completeOnboarding();
      router.replace('/(auth)/login' as any);
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace('/(auth)/login' as any);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Skip Button */}
        <View className="flex-row justify-end pt-4">
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-gray-500 text-base font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 justify-center items-center">
          <OnboardingCard
            title={ONBOARDING_DATA[currentIndex].title}
            description={ONBOARDING_DATA[currentIndex].description}
            image={ONBOARDING_DATA[currentIndex].image}
          />
        </View>

        {/* Pagination Dots */}
        <PaginationDots totalDots={ONBOARDING_DATA.length} activeIndex={currentIndex} />

        {/* Navigation Buttons */}
        <View className="flex-row justify-between items-center pb-8">
          <Button
            title="Previous"
            onPress={handlePrevious}
            variant="outline"
            disabled={currentIndex === 0}
            className={currentIndex === 0 ? 'opacity-0' : ''}
          />

          <Button
            title={currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            className="flex-1 ml-4"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
