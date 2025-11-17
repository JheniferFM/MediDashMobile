// app/index.js
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router"; // Importe o Link do expo-router
import styles from "./style"; // Ajuste o caminho para seus estilos

export default function Home() {
 return(

     <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, MediDash 👋</Text>
      <Text style={styles.subtitle}>Escolha uma opção abaixo:</Text>
      <View style={styles.menuContainer}>

        <Link href="/medicamentos/listar" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={"medkit-outline"} size={34} color="#0D47A1" /> 
            <Text style={styles.menuLabel}>{"Medicamentos"}</Text>
          </TouchableOpacity>
        </Link>

      </View>

      <Link href="/login/login"  style={styles.linkText}>
        Ir para o Login
      </Link>
    </View>
 );
}
