import ErrorIcon from "@/src/shared/icons/error-icon";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";

interface DiagnosisTabProps {
  desease: string;
}

export const DiagnosisTab = ({ desease }: DiagnosisTabProps) => {
  return (
    <View className="w-full bg-[#F2F6F7] py-6 rounded-[12px] px-6 mt-10">
      <View className="flex-row items-center">
        <ErrorIcon />
        <Text weight="bold" className="text-dark text-[20px] ml-2">
          Диагноз:
        </Text>
      </View>
      <Text weight="regular" className="text-dark text-[18px] mt-2 flex-shrink-1">
        {desease}
      </Text>
    </View>
  );
};
