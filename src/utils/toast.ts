import Toast from "react-native-toast-message";

export const tostify = ({type = 'success', title, subTitle, visibilityTime = 2500}: {type : 'success' | 'info' | 'error'; title : string; subTitle : string; visibilityTime?: number}) => {
    return Toast.show({
        type,
        text1: title,
        text2: subTitle,
        position:'top',
        visibilityTime
      })
}