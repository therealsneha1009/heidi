import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ImageBackground, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import bg from './assets/bg.png'; 

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };  

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>      
      <View style={{ alignItems: 'center'}}>
        {image && <Image source={{ uri: image}} style={{ width: 200, height: 200, paddingBottom: 100}} />}
        {image && <View style={{height: 30}}></View>}
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button style={styles.button} title="Camera" onPress={pickImageCamera}/>
          <View style={{width:20}}></View>
          <Button style={styles.button} title="Gallery" onPress={pickImageGallery}/>
        </View>
        {image && <View style={{height: 30}}></View>}
        {image && <Text style={{fontSize: 20, color: 'white'}}>Health Nails! (71% confident)</Text>}
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  button: {
    border: 20,
    color: '#000000'
  }
});