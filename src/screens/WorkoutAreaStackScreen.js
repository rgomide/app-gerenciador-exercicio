import { NavigationContainer } from "@react-navigation/native"
import { WORKOUT_AREA, EDIT_WORKOUT } from "../config/screensName"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WorkoutArea from "./WorkoutArea"
import EditWorkoutScreen from "./EditWorkoutScreen"
import appTheme from "../styles/appTheme"


const Stack = createNativeStackNavigator()

const WorkoutAreaStackScreen = () => {
    return(
        <NavigationContainer independent={true} theme={appTheme}>
            <Stack.Navigator initialRouteName={WORKOUT_AREA}>
                <Stack.Screen name={WORKOUT_AREA} component={WorkoutArea} options={{
                    headerShown: false,
                    }}/>
                <Stack.Screen name={EDIT_WORKOUT} component={EditWorkoutScreen} options={{
                    headerShown: false,
                    headerTitleStyle: {color: '#ffffff'},
                    headerTintColor: '#F28B0C',
                    title: 'Editar treinamentos'
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default WorkoutAreaStackScreen