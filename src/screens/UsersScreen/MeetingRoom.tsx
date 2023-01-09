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
} from 'react-native';
import React, {useState, useEffect, Fragment, useRef} from 'react';
import io, {Socket} from 'socket.io-client';
import {getLocalStream} from '../../utils/mediaDevices';
import Peer from 'react-native-peerjs';

import {RTCView} from 'react-native-webrtc';
const MeetingRoomTest = ({navigation}: any) => {
  const [local, setLocal] = useState<any>();
  const socketRef: any = useRef();
  const [streams, setStreams] = useState<any[]>([]);
  const [user, setUser] = useState<any>('');
  const [listUser, setListUser] = useState<any[]>([]);
  const peerServer = new Peer({
    // host: '192.168.1.16',
    // port: 8000,
    // path: '/mypeer',
    secure: false,
    // debug: 3,
  });

  peerServer.on('connection', (e: any) => console.log('connection'));
  peerServer.on('error', console.log);

  const roomID = '12317239812ajdszxctyy';
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
    socketRef.current = io('http://192.168.1.16:8000', {
      forceNew: true,
    });
    socketRef.current.on('connection', () => console.log('connection'));
    socketRef.current.on('list-users', ({users}: any) => {
      setListUser(users);
      console.log('list users');
    });
    getLocalStream()
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
          socketRef.current.on('user-disconnected', ({userId, users}: any) => {
            console.log('user disconnected', Platform.OS);
            setListUser(users);
          });
        });

        // Goi nhung thang dang stream

        CallStream(stream);
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    return () => {
      if (user) {
        socketRef.current.emit('out-room', {userId: user, roomID});
        peerServer.destroy();
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
            <View style={{padding: 20, backgroundColor: 'blue'}} key={index}>
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
    </ScrollView>
  );
};

export default MeetingRoomTest;

const Styles = StyleSheet.create({
  test: {
    transform: [{scaleX: -1}],
  },
});
