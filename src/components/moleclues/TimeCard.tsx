import { Text, View } from "react-native";


const TimeCard = ({title , subtitle, isSelected = false}: any) => {

    return (
        <View className={`w-[58px] h-[54px] ${isSelected ? 'bg-[#0EBE7F] text-white' : 'bg-[#DAFAEE] text-[#333D3A]'}  flex-col justify-center items-center rounded-[8px]`}>
            <Text className="text-sm  font-normal">{title}</Text>
            <Text className="text-sm font-normal">{subtitle}</Text>
        </View>
    )
}

export default TimeCard;