import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SignInScreen from './screens/SignIn'
import HomeScreen from './screens/Home'
import AuthLoadingScreen from './screens/Auth'
import SignUpScreen from './screens/SignUp'
import CircleScreen from './screens/Circle'
import CreateCircleScreen from './screens/CreateCircle'
import NearlyScreen from './screens/NearlyPeople'
import ViewProfileScreen from './screens/ViewProfile'
import Map from './screens/Map'

const AuthStack = createStackNavigator({SignIn: SignInScreen, SignUp: SignUpScreen})
const AppStack = createStackNavigator({Home: HomeScreen, Circle: CircleScreen, Create: CreateCircleScreen, Nearly: NearlyScreen, Profile: ViewProfileScreen, Map: Map});


export default createAppContainer(createSwitchNavigator(
  {
//    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));