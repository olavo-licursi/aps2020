import React, { useEffect, useState } from "react";



import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import api from "./services/api";

export default function App(){
    const [name, setName] = useState('');
    const [marca, setMarca] = useState('');
    const [potencia, setPotencia] = useState( );
    const [tempoUso, setTempoUso] = useState( );
    

    const [eletronicos, setEletronicos] = useState([]);

      useEffect(() => {
          api.get('/webresources/consumer/buscaeletro/1').then(response => {
            console.log(response.data);
            setEletronicos(response.data);
          });
        }, []);

        async function handleAddEletronico(){
            try{
              const response = await api.post('/webresources/consumer/cadastrareletro', {
                name: `${name}`,
                marca: `${marca}`,
                potencia: `${potencia}`,
                tempoUso: `${tempoUso}`,
                pessoaIdFk: '1',
              });
    
              const eletronico = response.data;
    
              setEletronicos([...eletronicos, eletronico]);

              api.get('/webresources/consumer/buscaeletro/1').then(response => {
                setEletronicos(response.data);
              });
            }catch(erro){
              console.log(erro);
            }
        }

      async function handleRemoveEletronico(id){
        await api.delete(`/webresources/consumer/deletaeletro/${id}`);

        const newEletronicos = eletronicos.filter(
          eletronico => eletronico.id !== id
        )

        setEletronicos(newEletronicos);
      }

      return(
        <>
            <StatusBar barStyle="light-content" backgroundColor="#87CEEB" />

              <SafeAreaView style={styles.container}>
                
                <ScrollView >
                    <View >
                          
                          <TextInput 
                            style={styles.input}
                            placeholder='Nome'
                            onChangeText={(val) => setName(val)}
                          />

                          <TextInput 
                            style={styles.input}
                            placeholder='Marca'
                            onChangeText={(val) => setMarca(val)}
                          />

                          <TextInput 
                            style={styles.input}
                            placeholder='Potencia'
                            onChangeText={(val) => setPotencia(val)}
                          />

                          <TextInput 
                            style={styles.input}
                            placeholder='Tempo de Uso'
                            onChangeText={(val) => setTempoUso(val)}
                          />

                          <TouchableOpacity 
                          activeOpacity={0.6}
                          style={styles.button} 
                          onPress={handleAddEletronico}
                          >
                              <Text style={styles.buttonText}>Adicionar Eletrônico</Text>
                          </TouchableOpacity>

                      
                      </View>
                
                
                   <FlatList 
                    data={eletronicos}
                    keyExtractor={eletronico => String(eletronico.id)}
                    renderItem={({ item: eletronico}) => (  
                      <View>
                        <View style={styles.eletroContainer}>
                        <Text style={styles.textStyle} >Nome: {eletronico.name}</Text>
                        <Text style={styles.textStyle} >Marca: {eletronico.marca}</Text>
                        <Text style={styles.textStyle} >Potencia: {eletronico.potencia}</Text>
                        <Text style={styles.textStyle} >Tempo Uso: {eletronico.tempoUso}</Text>
                        <Text style={styles.textStyle} >Gasto Dia Watts: {eletronico.gastoDiaWatts} KW</Text>
                        <Text style={styles.textStyle} >Gasto Mes Watts: {eletronico.gastoMesWatts} KW</Text>
                        <Text style={styles.textStyle} >Gasto Dia Reais: R${eletronico.gastoDiaReais}</Text>
                        <Text style={styles.textStyle} >Gasto Mes Reais: R${eletronico.gastoMesReais}</Text>
                        



                        <TouchableOpacity
                              activeOpacity={0.6}
                              style={styles.buttond} 
                              onPress={() => handleRemoveEletronico(eletronico.id)}
                              >
                                  <Text style={styles.buttonDelete}>Remover</Text>
                              </TouchableOpacity>      
                              </View>
                            
                        </View>)}
                        
                        
                    />
                </ScrollView>
              </SafeAreaView>
              
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E8E8E8",
    },
    textStyle: {       
        marginLeft:20,
        fontSize: 30,
        fontWeight: 'bold',
    },
    button:{
      backgroundColor: '#00CD66',
      margin: 20,
      height: 50,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttond:{
    backgroundColor: '#CD0000',
    margin: 20,
    height: 50,
    width: 150,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDelete:{
      fontWeight: 'bold',
      fontSize: 16,
      
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 350,
    marginLeft: 20,
    marginRight:20,
    fontWeight: 'bold',
    fontSize: 20,  
    
  },
  eletroContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#B5B5B5",
    padding: 20,
  },
});