import React, { useState } from "react";
import "./Record.css";
import html2canvas from "html2canvas";
import { MContext } from "./MyProvider";
import logo1 from "../record-img.png";
import logo from "../Teach.jpg";
import { Link, Outlet } from "react-router-dom";


export default function Record(props) {
  const [number, Countnumber] = useState(`1`);
  const video = () => {
    let b = document.getElementById("image").style;
    b.zIndex = "-6";

    let constraintObj = {
      audio: true,
      video: {
        facingMode: { exact: "user" },
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        // width: 400,
        // height: 100,
      },
    };

    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function (constraintObj) {
        let getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      };
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
          });
        })
        .catch((err) => {
          console.log(err.name, err.message);
        });
    }

    navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then(function (mediaStreamObj) {
        // connect the media stream to the first video element
        let video = document.getElementById("vid");
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function (ev) {
          //show in the video element what is being captured by the webcam
          video.play();
        };
      });
      
    let divstop = document.getElementById("divStop");
    divstop.style.zIndex = "10";

    const starting = async (stream1) => {
      const data = [];
      const mediaRecorder = new MediaRecorder(stream1);
      mediaRecorder.ondataavailable = (e) => {
        data.push(e.data);
      };
      mediaRecorder.start();
      let stop = document.getElementById("btnStop");
      stop.addEventListener("click", (e) => {
        clearInterval(Clearinterval);
        mediaRecorder.stop();
        setTimeout(() => {
          const myBlob = new Blob(data, {
            type: "video/mp4;",
          });
          const myFlie = new File([myBlob], "demo.mp4", {
            type: "video/mp4",
          });
          document.getElementById(props.vid2).src = URL.createObjectURL(myFlie);
        }, 3000);
        const video = document.getElementById("vid");
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach((track) => track.stop());
      });
    };

    const Clearinterval =  
    setInterval(() => {
      html2canvas(document.getElementById("can")).then((canvas) => {
        document.body.appendChild(canvas);
        var canvasElt = document.querySelector("canvas");
        var stream = canvasElt.captureStream(25);
        var vid = document.getElementById("vd");
        vid.srcObject = stream; 
        const stream1 =  new MediaStream(stream);
        starting(stream1);
        vid.onloadedmetadata = function (e) {
          vid.play();
        };
        document.body.removeChild(canvas);
      });
    }, 250);
  };


  return (
    <MContext.Consumer>
      {(context) => (
        <>
          <div id="contain">
            <div id="can">
              <div id="box">
                <div id="count-num">{number}</div>
                <div
                  name="textarea"
                  id="text"
                  onClick={() => {
                    let a = "";
                    let text = context.state.message;
                    let lines = text.split("\n");
                    let count = lines.length;
                    let n = count;
                    for (let i = 1; i <= n; i++) {
                      a = a + `${i}\n`;
                      Countnumber(`${a}`);
                    }

                    var isSyncingLeftScroll = false;
                    var isSyncingRightScroll = false;
                    var leftDiv = document.getElementById("text");
                    var rightDiv = document.getElementById("count-num");

                    leftDiv.onscroll = function () {
                      if (!isSyncingLeftScroll) {
                        isSyncingRightScroll = true;
                        rightDiv.scrollTop = this.scrollTop;
                      }
                      isSyncingLeftScroll = false;
                    };
                    rightDiv.onscroll = function () {
                      if (!isSyncingRightScroll) {
                        isSyncingLeftScroll = true;
                        leftDiv.scrollTop = this.scrollTop;
                      }
                      isSyncingRightScroll = false;
                    };
                  }}
                >
                  {"//Click here once before start recording\n\n" +
                    context.state.message}
                </div>
              </div>
              <video id="vid"></video>
              <img id="image" src={logo} alt="Adjust yourself to camara!" />
            </div>
            <div id="divStop">
              <Link to="/Download">
                <button id="btnStop">Next{"->"}</button>
              </Link>
            </div>
            <button id="btnStart" onClick={video}>
              <img src={logo1} alt="" />
              <span>Start recording</span>
            </button>
          </div>
          <div id="vd-div">
            <video id="vd" controls></video>
          </div>
          <Outlet />
        </>
      )}
    </MContext.Consumer>
  );
}
