import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  Clipboard,
} from 'react-native';
import React, {useState, useEffect, Fragment, useRef} from 'react';
import io, {Socket} from 'socket.io-client';
import {getLocalStream} from '../../utils/mediaDevices';
import Peer from 'react-native-peerjs';
import {mediaDevices, MediaStream} from 'react-native-webrtc';
import {RTCView} from 'react-native-webrtc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {socketURL} from '../../Config/config';
const MeetingRoomTest = ({navigation, route}: any) => {
  const [local, setLocal] = useState<any>();
  const socketRef: any = useRef();
  const [streams, setStreams] = useState<any[]>([]);
  const [user, setUser] = useState<any>('');
  const [listUser, setListUser] = useState<any[]>([]);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const peerServer = new Peer({
    // host: '192.168.2.209',
    // port: 8000,
    // path: '/mypeer',
    secure: false,
    // debug: 3,
  });
  const copyToClipboard = () => {
    Toast.show({
      type: 'success',
      text1: `Đã copy ${roomID}`,
    });
    Clipboard.setString(roomID);
  };
  peerServer.on('connection', (e: any) => console.log('connection'));
  peerServer.on('error', console.log);
  console.log(route);
  const roomID = route.params.roomID;
  const CallStream = (stream: any) => {
    peerServer.on('call', (call: any) => {
      console.log('peer call ');
      call.answer(stream);
      call.on('stream', (streamNew: any) => {
        console.log('running peer connection', streamNew);
        setStreams((pre: any) => [...pre, streamNew]);
      });
    });
  };
  useEffect(() => {
    socketRef.current = io(socketURL, {
      forceNew: true,
    });
    socketRef.current.on('connection', () => console.log('connection'));
    socketRef.current.on('list-users', ({users}: any) => {
      setListUser(users);
      console.log('list users');
    });

    mediaDevices
      .enumerateDevices()
      .then((sourceInfos: any) => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (sourceInfo.kind == 'videoinput' && sourceInfo.facing == 'front') {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        mediaDevices
          .getUserMedia({
            audio: mic,
            video: camera
              ? {
                  width: 640,
                  height: 480,
                  frameRate: 30,
                  facingMode: 'user',
                  deviceId: videoSourceId,
                }
              : false,
          })
          .then(stream => {
            setLocal(stream);
            // console.log(stream.id);
            peerServer.on('open', (userId: any) => {
              setUser(userId);
              socketRef.current.emit('join-room', {
                userId,
                roomID,
                streamID: stream.id,
              });

              socketRef.current.on('user-connected', ({userId, users}: any) => {
                console.log('connect to new server', Platform.OS);
                setListUser(users);
                console.log('user connected', users);
                const call = peerServer.call(userId, stream);
                // Goi khi co thang nao do bat dau stream
                call.on('stream', (data: any) => {
                  console.log(data);
                  setStreams((pre: any) => [...pre, data]);
                });
              });
              socketRef.current.on(
                'user-disconnected',
                ({userId, users}: any) => {
                  console.log('user disconnected', Platform.OS);
                  setListUser(users);
                },
              );
            });

            // Goi nhung thang dang stream

            CallStream(stream);
          })
          .catch(err => console.log(err));
      })
      .catch(e => {});
    return () => {
      peerServer.destroy();
    };
  }, []);
  useEffect(() => {
    return () => {
      if (user) {
        socketRef.current.emit('out-room', {userId: user, roomID});
        console.log('out-room destroyed');
        setStreams([]);
      }
    };
  }, [user]);

  return (
    <ScrollView>
      <RTCView
        style={[
          {
            height: 180,
            width: 180,
          },
          Styles.test,
        ]}
        streamURL={local?.toURL()}
      />

      {streams.map((peer: any, index: number) => {
        return (
          listUser &&
          listUser.find(e => e.streamID === peer.id) && (
            <View style={{padding: 20}} key={index}>
              <RTCView
                streamURL={peer?.toURL()}
                style={[
                  {
                    height: 180,
                    width: 180,
                  },
                  Styles.test,
                ]}
              />
            </View>
          )
        );
      })}
      <Button
        title="Mic"
        onPress={async () => {
          try {
            const audioTrack = await local.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
          } catch (err) {
            // Handle Error
          }
        }}></Button>
      <Button
        title="Camera"
        onPress={async () => {
          try {
            const videoTrack = await local.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
          } catch (err) {
            // Handle Error
          }
        }}></Button>
      <TouchableOpacity onPress={copyToClipboard}>
        <Text>
          Room Code : {roomID} <Icon name="content-copy" size={24}></Icon>
        </Text>
      </TouchableOpacity>
      <Toast></Toast>
    </ScrollView>
  );
};

export default MeetingRoomTest;

const Styles = StyleSheet.create({
  test: {
    transform: [{scaleX: -1}],
  },
});
