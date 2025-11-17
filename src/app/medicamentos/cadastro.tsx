// components/MedicationForm.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'; // Ajuste o caminho se seu styles.js estiver em outro lugar
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'

const MedicationForm = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTomado, setEditingTomado] = useState<boolean>(false);

  const isMounted = useRef(true);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.editar) {
      try {
        const editar = JSON.parse(Array.isArray(params.editar) ? params.editar[0] : (params.editar as string));
        setEditingId(editar.id);
        setEditingTomado(!!editar.tomado);
        setMedicationName(editar.nome ?? '');
        setDosage(editar.dosagem ?? '');
        // frequency/time não existem no item, deixamos como estão ou vazio
      } catch (e) {
        console.warn('Falha ao carregar item para edição:', e);
      }
    } else {
      setEditingId(null);
      setEditingTomado(false);
    }
  }, [params.editar]);



  const onChangeTime = (event, chosenTime) => {
    const currentTime = chosenTime || selectedTime;
    if (isMounted.current) {
      setShowTimePicker(Platform.OS === 'ios');
      setSelectedTime(currentTime);
    }
  };

  const showTimePickerModal = () => {
    if (isMounted.current) {
      setShowTimePicker(true);
    }
  };

  const handleSubmit = () => {
    if (!medicationName || !dosage || !frequency) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (editingId) {
      // Atualização
      const editado = {
        id: editingId,
        nome: medicationName,
        dosagem: dosage,
        tomado: editingTomado,
      };
      Alert.alert('Sucesso!', `Medicamento ${medicationName} atualizado.`);
      router.replace({ pathname: '/medicamentos/listar', params: { editado: JSON.stringify(editado) } });
      return;
    }

    const formData = {
      medicationName,
      dosage,
      frequency,
      time: formattedTime,
    };

    console.log('Dados do Medicamento:', formData);
    Alert.alert('Sucesso!', `Medicamento ${medicationName} agendado para ${formattedTime}.`);

    // Navegar para a listagem levando o novo item
    const novoItem = {
      id: Date.now().toString(),
      nome: medicationName,
      dosagem: dosage,
      tomado: false,
    };
    router.replace({ pathname: '/medicamentos/listar', params: { novo: JSON.stringify(novoItem) } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Text style={styles.title}>{editingId ? 'Editar Medicamento' : 'Cadastrar Medicamento'}</Text>
        <Link href={'/medicamentos/listar'} asChild>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Abrir lista de medicamentos">
            <Ionicons name="medkit-outline" size={26} color="#0D47A1" />
          </TouchableOpacity>
        </Link>
      </View>
      <Text style={styles.subtitle}>{editingId ? 'Atualize os dados do medicamento.' : 'Preencha os detalhes para agendar seu medicamento.'}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Medicamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Ibuprofeno"
          value={medicationName}
          onChangeText={setMedicationName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dosagem</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 200mg, 1 comprimido"
          value={dosage}
          onChangeText={setDosage}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Frequência</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 8 em 8 horas, 1 vez ao dia"
          value={frequency}
          onChangeText={setFrequency}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Horário</Text>
        <TouchableOpacity onPress={showTimePickerModal} style={styles.timePickerButton}>
          <Text style={styles.timePickerButtonText}>Selecionar Horário</Text>
        </TouchableOpacity>
        <Text style={styles.selectedTimeText}>
          Horário selecionado: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        {showTimePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Salvar Medicamento</Text>
      </TouchableOpacity>

      <Link href={'/'} asChild>
        <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Voltar</Text>
      </TouchableOpacity>
      </Link>

    
    </ScrollView>
  );
};

export default MedicationForm;
