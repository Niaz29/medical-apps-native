import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
import SocketIOClient from 'socket.io-client';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCView,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import IconContainer from '../components/IconContainer';

// Header Component
const Header = ({username, setType, processCall} : any) => {
    const navigation = useNavigation();
  return (
    <View className=' px-3 py-7'>
    <View className="flex-row justify-between items-center">
      <View className='flex-row items-center mt-3'>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* Replace this text with an icon if needed */}
      <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
    </TouchableOpacity>
    <View className='flex flex-row justify-center items-center gap-x-4 ml-3'>
    <Image
        source={{ uri: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838' }}
        className="w-10 h-10 rounded-full"
      />
      <Text className="text-lg font-bold">{username}</Text>
    </View>
      </View>

    <View className='flex flex-row justify-center items-center gap-x-4 mr-3'>
    {/* <Icon name="phone" size={15} color="black" /> */}
   <TouchableOpacity  onPress={() => {
                  setType('OUTGOING_CALL');
                  // processCall();
                }}>
   <Icon name="video-camera" size={15} color="black" />
   </TouchableOpacity>
     
    </View>
    
  </View>
  </View>
  );
};

const ChatScreen = ({ route } : any) => {
  const [localStream, setlocalStream] = useState(null);
  const username  = route?.params?.username;
  const callerIdForUser = route?.params?.callerId;

  const [remoteStream, setRemoteStream] = useState(null);

  const [type, setType] = useState('JOIN');

  const [callerId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );
  const otherUserId = useRef(null);

  const socket = SocketIOClient('https://medical-app.online', {
    transports: ['websocket'],
    query: {
      callerId,
    },
  });

  const [localMicOn, setlocalMicOn] = useState(true);

  const [localWebcamOn, setlocalWebcamOn] = useState(true);

  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );

  let remoteRTCMessage = useRef(null);



  useEffect(() => {

    socket.on('newCall', data => {
      remoteRTCMessage.current = data.rtcMessage;
      otherUserId.current = data.callerId;
      setType('INCOMING_CALL');
      
    });

    socket.on('callAnswered', data => {
      remoteRTCMessage.current = data.rtcMessage;
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(remoteRTCMessage.current),
      );
      setType('WEBRTC_ROOM');
    });

    socket.on('ICEcandidate', data => {
      let message = data.rtcMessage;

      if (peerConnection.current) {
        peerConnection?.current
          .addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMid: message.id,
              sdpMLineIndex: message.label,
            }),
          )
          .then(data => {
            console.log('SUCCESS');
          })
          .catch(err => {
            console.log('Error', err);
          });
      }
    });

    let isFront = false;

    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!

          setlocalStream(stream);

          // setup stream listening
          peerConnection.current.addStream(stream);
        })
        .catch(error => {
          // Log error
        });
    });

    peerConnection.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };

    // Setup ice handling
    peerConnection.current.onicecandidate = event => {
      if (event.candidate) {
        sendICEcandidate({
          calleeId: otherUserId.current,
          rtcMessage: {
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          },
        });
      } else {
        console.log('End of candidates.');
      }
    };

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
      socket.off('activeUsers')
    };
  }, []);

  useEffect(() => {
    InCallManager.start();
    InCallManager.setKeepScreenOn(true);
    InCallManager.setForceSpeakerphoneOn(true);

    return () => {
      InCallManager.stop();
    };
  }, []);

  function sendICEcandidate(data) {
    socket.emit('ICEcandidate', data);
  }

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current),
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  function answerCall(data) {
    socket.emit('answerCall', data);
  }

  function sendCall(data) {
    socket.emit('call', data);
  }

  function switchCamera() {
    localStream.getVideoTracks().forEach(track => {
      track._switchCamera();
    });
  }
  
  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach(track => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  
  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach(track => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }
  
  function leave() {
    peerConnection.current.close();
    setlocalStream(null);
    setType('JOIN');
  }


const MessageScreen = () => {
  const navigation = useNavigation();


  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi Doctor, I have a question.', sender: 'patient' },
    { id: '2', text: 'Sure, go ahead!', sender: 'doctor' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), text: inputText, sender: 'patient' },
      ]);
      setInputText('');
    }
  };

  const renderMessage = ({ item } : any) => {
    const isPatient = item.sender === 'patient';
    return (
      <View
        className={`my-2 mx-4 flex flex-row gap-x-3 items-center p-3 rounded-lg max-w-[80%] ${
          isPatient ? 'bg-green-500 self-start' : 'bg-white border-gray-300 border self-end'
        }`}>
             {
                isPatient ? (<Image
                    source={{ uri: 'https://www.shutterstock.com/shutterstock/photos/2289779951/display_1500/stock-photo-happy-young-man-in-glasses-white-background-2289779951.jpg' }}
                    className="w-10 h-10 rounded-full"
                  />) :(<Image
                    source={{ uri: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838' }}
                    className="w-10 h-10 rounded-full"
                  />)
             }
        <Text className={`${isPatient ? 'text-white' : 'text-black'}`}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      {/* <Header username={username} processCall={processCall} setType={setType}/> */}

      <View className=' px-3 py-7'>
    <View className="flex-row justify-between items-center">
      <View className='flex-row items-center mt-3'>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* Replace this text with an icon if needed */}
      <Image className='w-[8px] h-[16px] mx-3' source={require('../../assets/images/right-arrow.png')} />
    </TouchableOpacity>
    <View className='flex flex-row justify-center items-center gap-x-4 ml-3'>
    <Image
        source={{ uri: 'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734710672~exp=1734714272~hmac=1a5f5925988ca2121c324220d05621c9df2d3eeff91fa2f9cb6098131314e838' }}
        className="w-10 h-10 rounded-full"
      />
      <Text className="text-lg font-bold">{username}</Text>
    </View>
      </View>

    <View className='flex flex-row justify-center items-center gap-x-4 mr-3'>
    {/* <Icon name="phone" size={15} color="black" /> */}
   <TouchableOpacity  onPress={() => {
                  setType('OUTGOING_CALL');
                  processCall();
                }}>
   <Icon name="video-camera" size={15} color="black" />
   </TouchableOpacity>
     
    </View>
    
  </View>
  </View>

      {/* Chat List */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        className="flex-1 px-2 py-4"
      />

      {/* Input Area */}
      <View className="flex-row items-center px-4 py-2 bg-white">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-4 text-black"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="rounded-full h-15 w-15 flex items-center justify-center">
           <Image
        source={require('../../assets/images/plane.jpg')}
        className="w-14 h-14 rounded-full"
      />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const OutgoingCallScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#050A0E',
      }}>
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#D0D4DD',
          }}>
          Calling to...
        </Text>

        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: '#ffff',
            letterSpacing: 6,
          }}>
          {username}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setType('JOIN');
            otherUserId.current = null;
          }}
          style={{
            backgroundColor: '#FF5D5D',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
           <Icon name="phone" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const IncomingCallScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#050A0E',
      }}>
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
        }}>
        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: '#ffff',
          }}>
          {username} is calling..
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            processAccept();
            setType('WEBRTC_ROOM');
          }}
          style={{
            backgroundColor: 'green',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="phone" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WebrtcRoomScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
        paddingHorizontal: 12,
        paddingVertical: 12,
      }}>
      {localStream ? (
        <RTCView
          objectFit={'cover'}
          style={{flex: 1, backgroundColor: '#050A0E'}}
          streamURL={localStream.toURL()}
        />
      ) : null}
      {remoteStream ? (
        <RTCView
          objectFit={'cover'}
          style={{
            flex: 1,
            backgroundColor: '#050A0E',
            marginTop: 8,
          }}
          streamURL={remoteStream.toURL()}
        />
      ) : null}
      <View
        style={{
          marginVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <IconContainer
          backgroundColor={'red'}
          onPress={() => {
            leave();
          }}
          Icon={() => {
            return  <Icon name="phone" size={20} color="white" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localMicOn ? '#fff' : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <Icon name="microphone" size={20} color="white" />
            ) : (
              <Icon name="microphone" size={20} color="white" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localWebcamOn ? '#fff' : 'transparent'}
          onPress={() => {
            toggleCamera();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <Icon name="microphone" size={20} color="white" />
            ) : (
              <Icon name="microphone" size={20} color="white" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={'transparent'}
          onPress={() => {
            switchCamera();
          }}
          Icon={() => {
            return <Icon name="microphone" size={20} color="white" />;
          }}
        />
      </View>
    </View>
   
  );
};
const renderScreen = () => {
  switch (type) {
    case 'JOIN':
      return <MessageScreen />;
    case 'INCOMING_CALL':
      return <IncomingCallScreen />;
    case 'OUTGOING_CALL':
      return <OutgoingCallScreen />;
    case 'WEBRTC_ROOM':
      return <WebrtcRoomScreen />;
    default:
      return null;
  }
};

return <>{renderScreen()}</>;
  
};



export default ChatScreen;