import { Stack } from "expo-router";
import { StackScreen } from "react-native-screens";

export default function Layout(){
    return(
        <Stack
        screenOptions={{
            headerStyle:{
                backgroundColor:'#0D47A1'
            },
            headerTintColor: '#fff'
        }}
        >
            <Stack.Screen name="index" options={{title:"Inicial"}}/>
            <Stack.Screen name="login/login" options={{title:"Login"}}/>
            <Stack.Screen name="login/criar" options={{title:"Criar Conta"}}/>
            <Stack.Screen name="home/home" options={{title:"Home"}}/>
            <Stack.Screen name="medicamentos/cadastro" options={{title:"Cadastro"}}/>
            <Stack.Screen name="medicamentos/listar" options={{title:"Listagem"}}/>
        </Stack>
    );
}