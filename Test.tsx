import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {joinRoom} from './src/store/action/videoAction';
import {connect} from 'react-redux';
import {mediaDevices, MediaStream, RTCView} from 'react-native-webrtc';
class Test extends React.Component {
  constructor(props: any) {
    super(props);
  }
  componentDidMount(): void {
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
            audio: false,
            video: {
              width: 640,
              height: 480,
              frameRate: 30,
              facingMode: 'user',
              deviceId: videoSourceId,
            },
          })
          .then(stream => {
            this.props.joinRoom(stream);
          })
          .catch(error => {});
      })
      .catch(e => {});
  }
  render() {
    const {streams, myStream} = this.props.video;
    console.log(myStream);
    console.log(streams, 'stream');
    return (
      <SafeAreaView>
        <Text>Test</Text>
        {myStream && (
          <RTCView
            streamURL={myStream.toURL()}
            style={{width: 180, height: 180}}></RTCView>
        )}
        {streams &&
          streams.map((stream: any, index: number) => {
            console.log(stream);
            return (
              <RTCView
                streamURL={stream.toURL()}
                style={{width: 180, height: 180}}
                key={index}></RTCView>
            );
          })}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({video}: any) => ({
  video,
});

export default connect(mapStateToProps, {joinRoom})(Test);
