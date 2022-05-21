import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  GestureResponderEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import StyledButton from "./components/button";
import {
  checkBalance,
  checkValidity,
  MnemonicGenerator,
} from "./services/generator";

export default function App() {
  const [count, setCount] = useState(0);
  const [generateAmount, setGenerateAmount] = useState<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [validPhrases, setValidPhrases] = useState([
    { balanceMnemonic: 0, mnemonic: "" },
  ]);

  async function generateWallet(amounttogenerate: number | undefined) {
    if (amounttogenerate === undefined) return;
    setIsRunning(true);
    for (let i = 0; i < amounttogenerate; i++) {
      const generatedMnemonic = MnemonicGenerator();
      const validMnemonic = checkValidity(generatedMnemonic);
      if (validMnemonic === null) console.log("invalid phrase");
      else {
        await checkBalance(validMnemonic).then((balance) =>
          setValidPhrases((prevState) => [
            ...prevState,
            { balanceMnemonic: balance.toNumber(), mnemonic: validMnemonic },
          ])
        );
      }
      setCount((currCount) => currCount + 1);
    }
    setIsRunning(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 400,
          padding: 10,
          borderColor: "#d1d1d1",
          borderWidth: 2,
          width: "90%",
          borderRadius: 10,
          backgroundColor: "#ffffff",
        }}
      >
        <ScrollView keyboardDismissMode="on-drag">
          {validPhrases.map((wallet) => {
            return (
              <Text key={wallet.mnemonic}>
                {wallet.balanceMnemonic} : {wallet.mnemonic}
              </Text>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          margin: 20,
          backgroundColor: "#d1d1d1",
          padding: 15,
          borderRadius: 10,
          width: "80%",
        }}
      >
        <TextInput
          placeholder="How many wallets would you like to generate"
          onChangeText={setGenerateAmount}
          value={generateAmount?.toString()}
          keyboardType="numeric"
        />
      </View>
      <Text>Wallets generated: {count}</Text>
      <StyledButton
        isRunning={isRunning}
        onPress={() => generateWallet(generateAmount)}
        text="Generate"
      />
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbdbdb",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
