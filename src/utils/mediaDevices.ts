import { mediaDevices, MediaStream } from "react-native-webrtc"


const getLocalStream = ({isAudio,isVideo}:{isAudio:boolean , isVideo:boolean}): Promise<MediaStream> => new Promise((resolve, reject) => {
    mediaDevices.enumerateDevices().then((sourceInfos: any) => {
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (sourceInfo.kind == "videoinput" && sourceInfo.facing == "front") {
                videoSourceId = sourceInfo.deviceId;
            }
        }
        mediaDevices.getUserMedia({
            audio: isAudio,
            video: isVideo ? {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: "user",
                deviceId: videoSourceId
            }:false
        })
            .then(stream => {
                resolve(stream as MediaStream)
            })
            .catch(error => {
                reject({ message: "Local Stream fetch error" })
            });

    }).catch((e) => {
        reject({ message: "Device List fetch error" })
    })
})

export {
    getLocalStream
}