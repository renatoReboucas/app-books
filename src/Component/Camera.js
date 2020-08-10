import React, { useState, useEffect } from "react";
import {
  View, 
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,

} from 'react-native' 
import Icon from "react-native-vector-icons/MaterialIcons";
import {Camera as ExpoCamera} from 'expo-camera'

const Camera = ({ onCloseCamera, ontakePicture }) => {
  const [hasPermition, setHasPermition] = useState(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [camera, setCamera] = useState()

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermition(status === "grated");
    })();
  }, []);

  const onFlipePress = () => {
    setType(
      type === ExpoCamera.Constants.Type.back
        ? ExpoCamera.Constants.Type.front
        : ExpoCamera.Constants.Type.back,
    );
  };
  const ontakePicturePress = async () => {
    try{
      const {uri} = await camera.takePictureAsync({
        quality: 0.5,
      })
      ontakePicture(uri)
    }catch(error){
      console.log(error)
      Alert.alert("Erro", "Houve um erro ao tirar a foto.")
    }
  }
  return (
    <ExpoCamera 
      style={{ flex: 1 }} 
      type={type} 
      ref={ ref => setCamera(ref) }
    >
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onFlipePress}>
          <Text style={styles.flipText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="close" size={50} color={"#FFF"} onPress={onCloseCamera} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.takePictureButton}
        onPress={ontakePicturePress}  
      >
        <Icon name="photo-camera" size={50} color="#FFF" />
      </TouchableOpacity>
    </ExpoCamera>
  );
};

const styles = StyleSheet.create({
  actionButtons:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  flipText:{
    fontSize: 18,
    color: '#FFF'
  },
  takePictureButton:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default Camera