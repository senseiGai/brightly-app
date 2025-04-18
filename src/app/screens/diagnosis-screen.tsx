import { ScrollView, View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { DiagnosisTab } from "@/src/features/diagnosis/ui/diagnosis-tab";
import { DiagnosisDescription } from "@/src/features/diagnosis/ui/diagnosis-description";
import { Button } from "@/src/shared/ui/button/button";
import { Avatar } from "@/src/features/avatar/ui/avatar";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { DiagnosisResponse } from "@/src/entities/upload-photo";
import { useEffect, useState } from "react";

const formatDiagnosisText = (data: DiagnosisResponse): string => {
  let text = data.description;

  if (data.risk_description) {
    text += "\n\n" + data.risk_description;
  }

  if (data.short_recommendation) {
    text += "\n\nРекомендация: " + data.short_recommendation;
  }

  return text;
};

export const DiagnosisScreen = () => {
  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Diagnosis">>();

  const [diagnosisData, setDiagnosisData] = useState<DiagnosisResponse | null>(
    route.params?.diagnosisData || null
  );

  if (!diagnosisData) {
    return (
      <SafeAreaView className="bg-white flex-1 justify-center items-center">
        <Text weight="regular" className="text-[#8B8B8B] text-[16px]">
          Анализируем фото...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 min-h-full flex-col justify-between">
          <View className="flex items-center w-[90%] mx-auto mb-4">
            <Text weight="bold" className="text-dark text-[38px] mt-16 -ml-8">
              ✨ Готово!
            </Text>
            <Text weight="regular" className="text-[#8B8B8B] text-[16px] mt-5">
              Ознакомьтесь с полным отчетом
            </Text>
            <DiagnosisTab desease={diagnosisData.desease} />
            <DiagnosisDescription
              description={formatDiagnosisText(diagnosisData)}
            />
          </View>
          <View className="flex flex-row items-center justify-between w-[90%] mt-auto mx-auto">
            <Avatar />
            <Button
              onPress={() => navigate("WebView" as never)}
              variant="diagnosis"
            >
              <Text weight="bold" className="text-white text-[16px]">
                Записаться к врачу
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
