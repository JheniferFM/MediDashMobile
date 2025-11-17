import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'

export default function Listar() {
  const [items, setItems] = useState([
    { id: '1', nome: 'Paracetamol', dosagem: '500mg', tomado: false },
    { id: '2', nome: 'Ibuprofeno', dosagem: '200mg', tomado: true },
  ])

  const params = useLocalSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    if (params.novo) {
      try {
        const novo = JSON.parse(Array.isArray(params.novo) ? params.novo[0] : (params.novo as string));
        setItems(prev => [{ ...novo }, ...prev]);
      } catch (e) {
        console.warn('Falha ao ler novo item da navegação:', e);
      }
    }
  }, [params.novo]);

  React.useEffect(() => {
    if (params.editado) {
      try {
        const editado = JSON.parse(Array.isArray(params.editado) ? params.editado[0] : (params.editado as string));
        setItems(prev => prev.map(it => it.id === editado.id ? { ...it, ...editado } : it));
      } catch (e) {
        console.warn('Falha ao ler item editado da navegação:', e);
      }
    }
  }, [params.editado]);

  const toggleTomado = (id: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, tomado: !it.tomado } : it))
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  const renderItem = ({ item }: { item: { id: string, nome: string, dosagem: string, tomado: boolean } }) => (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
      backgroundColor: item.tomado ? '#E8F5E9' : '#FFEBEE'
    }}>
      <View style={{ flex: 2, paddingHorizontal: 8 }}>
        <Text style={{ fontWeight: '600' }}>{item.nome}</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Text>{item.dosagem}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 8, paddingHorizontal: 8 }}>
        <TouchableOpacity onPress={() => toggleTomado(item.id)}>
          <Ionicons name={item.tomado ? 'checkmark-circle-outline' : 'close-circle-outline'} size={22} color={item.tomado ? '#2E7D32' : '#C62828'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/medicamentos/cadastro', params: { editar: JSON.stringify(item) } })}>
          <Ionicons name="create-outline" size={22} color="#0D47A1" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Ionicons name="trash-outline" size={22} color="#C62828" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
        <Text style={styles.title}>Meus Medicamentos</Text>
        <Link href={'/medicamentos/cadastro'} asChild>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="add-circle-outline" size={22} color="#0D47A1" />
            <Text style={{ marginLeft: 6, color: '#0D47A1', fontWeight: '600' }}>Adicionar Medicamento</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={{ width: '100%', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#F5F5F5', paddingVertical: 8 }}>
          <View style={{ flex: 2, paddingHorizontal: 8 }}>
            <Text style={{ fontWeight: '700' }}>Nome</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <Text style={{ fontWeight: '700' }}>Dosagem</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 8, textAlign: 'right' }}>
            <Text style={{ fontWeight: '700' }}>Ação</Text>
          </View>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
        />
      </View>
    </View>
  )
}