import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native'

interface ButtonProps {
  onPress: () => void;
  text: string;
  isRunning: boolean;
}

export default function StyledButton({ onPress, text, isRunning }: ButtonProps) {
  if(isRunning) return (
    <TouchableOpacity style={styles.running}>
      <ActivityIndicator size="small" color="#ffffff" />
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{color:'#ffffff'}}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#636363',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  running:{
    backgroundColor: '#d1d1d1',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  }
})