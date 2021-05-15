import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "react-speech";

const Dictaphone = () => {
  const [message, setMessage] = useState("");
  const [netflix, setNetflix] = useState(false);
  const [numberCalled, setNumCalled] = useState([]);


  const commands = [
    {
      command: "* Tambola *",
      callback: () => alert(`You are soo good`),
    },
    {
        command: "Number *",
        callback: (number, { resetTranscript }) => {
                if(number < 91 && number > 1)
                setNumCalled([...numberCalled, number]);
                resetTranscript();
        },
      },
    {
      command: "I would like to order *",
      callback: (food) => setMessage(`Your order is for: ${food}`),
    },
    {
      command: "The weather is :condition today",
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: "My top sports are * and *",
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: "Pass the salt (please)",
      callback: () => setMessage("My pleasure"),
    },
    {
      command: ["Hello", "Hi"],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: "Beijing",
      callback: (command, spokenPhrase, similarityRatio) =>
        setMessage(
          `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
        ),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ["eat", "sleep", "leave"],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
    {
      command: "open netflix",
      callback: () => setNetflix(true),
    },
  ];

  if (netflix) {
    window.location.href = "https://www.netflix.com";
  }

  SpeechRecognition.startListening({ continuous: true });
  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div>
      <Speech
        text={"32, 45, 6, 7, 8"}
        play={true}
        pitch="1"
        rate="1"
        volume="1"
        lang="en-GB"
        voice="Google UK English Female"
      />
      <p>{message}</p>
      <p>{transcript}</p>
      <hr></hr>
      <p>{numberCalled.map((num) => {
          return (<span>{num}{" "}</span>)
      })}</p>
    </div>
  );
};
export default Dictaphone;
