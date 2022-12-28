import React, {useEffect} from 'react';
import {ZoomMtg} from "@zoomus/websdk";


// pass in your Zoom JWT API key, Zoom JWT API secret, Zoom meeting number, and 0 to join meeting or webinar or 1 to start meeting
//console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0))
const crypto = require('crypto') // crypto comes with Node.js
function generateSignature(apiKey, apiSecret, meetingNumber, role) {
    // Prevent time sync issue between client signature generation and Zoom
    return new Promise((res, rej) => {
        const timestamp = new Date().getTime() - 30000
        const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
        const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
        const signature = Buffer.from(apiKey, meetingNumber, timestamp, role, hash).toString('base64')
        res(signature)
    })

}

// pass in your Zoom JWT API key, Zoom JWT API secret, Zoom meeting number, and 0 to join meeting or webinar or 1 to start meeting
//console.log(generateSignature(process.env.API_KEY, process.env.API_SECRET, 123456789, 0))
const Zoom = (props) => {

    useEffect(() => {
        showZoomDiv()
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av')
        // loads dependent assets
        ZoomMtg.preLoadWasm()
        ZoomMtg.prepareWebSDK()
        initialMeeting()
// loads language files, also passes any error messages to the ui

    }, []);

    const showZoomDiv = () => {
        document.getElementById("zmmtg-root").style.display = 'block'
    }
    let signature_code = ''
    generateSignature('JWT_API_KEY', '', 123456789, 0).then((res) => {
        signature_code = res
    })
    const initialMeeting = () => {
        ZoomMtg.init({
            leaveUrl: 'http://localhost:6666/',
            success: (success) => {
                console.log(success)

                ZoomMtg.join({
                    signatureEndpoint: 'http://localhost:3000/',
                    signature: signature_code,
                    meetingNumber: 87124587231,
                    apiSecret: 'Jj0zuGYqNQPSwadO5wY12R493BmgtAGc83Od',
                    userName: 'Zoom',
                    apiKey: 'zsjCEO5kSpWHJHqveAofLg',
                    userEmail: 'kiapolo41@gmail.com',
                    passWord: 'pX1c0s',
                    success: (success) => {
                        console.log(success)
                    },
                    error: (error) => {
                        console.log(error)
                    }
                })

            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    return (<div className={"app"}>
        gggg
    </div>)

};

export default Zoom;