import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingCard, PaginationDots } from "../../components";
import { useAuth } from "../../contexts";
import { ONBOARDING_DATA } from "../../lib";

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuth();
  const router = useRouter();

  const handleNext = async () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await completeOnboarding();
      router.replace("/(auth)/login" as any);
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace("/(auth)/login" as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Content */}
        <View className="flex-1 justify-center items-center">
          <OnboardingCard
            title={ONBOARDING_DATA[currentIndex].title}
            description={ONBOARDING_DATA[currentIndex].description}
            image={ONBOARDING_DATA[currentIndex].image}
          />
        </View>

        {/* Pagination Dots */}
        <PaginationDots
          totalDots={ONBOARDING_DATA.length}
          activeIndex={currentIndex}
        />

        {/* Bottom Buttons */}
        <View className="items-center pb-10">
          {/* Primary Blue Button */}
          <TouchableOpacity
            onPress={handleNext}
            className="bg-blue-400 w-full py-4 rounded-3xl items-center"
          >
            <Text className="text-white font-semibold text-lg">
              {currentIndex === ONBOARDING_DATA.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>

          {/* Skip Link */}
          <TouchableOpacity onPress={handleSkip} className="mt-1 border border-blue-400 w-full py-4 rounded-3xl items-center">
            <Text className="text-black text-base font-medium ">
              Skip & Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
