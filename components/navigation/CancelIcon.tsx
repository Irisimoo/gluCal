import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export function CancelIcon({navigation}) {
    return <Feather name="x" size={22} color="#9A9A9A" onPress={() => navigation.goBack()}/>;
  }