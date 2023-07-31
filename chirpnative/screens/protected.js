import useApp from "../hooks/useApp";
import { useNavigation } from '@react-navigation/native';

const Protected = (Wrapped) => {
    return (props) => {
    const navigation = useNavigation()
    const {token} = useApp()
    if(token){
       return <Wrapped {...props} />
    }
    else{
        navigation.navigate('Login')
    }
}
}

export default Protected