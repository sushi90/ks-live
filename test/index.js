'use strict'

const KSLIVE = require('..')

const ak = 'P3UPCMORAFON76Q6RTNQ'
const sk = 'Ik90eHJ6eElzZnBGakE3U3dQeklMd3k'

const stream = new KSLIVE(ak, sk)

let dName = 'blued'
let app = 'live'
let streamName = 1
let opts = {
  expire: 1436976000,
  resource: {
    nonce: '4e1f2519c626cbfbab1520c255830c26',
    public: 0,
    vdoid: 12345 //直播结束后保存的文件名
  }
}
let rtmpUrl = stream.createRTMPUrl(dName, app, streamName, opts)
console.log(rtmpUrl) //rtmp://blued.uplive.ks-cdn.com/live/1?signature=8WRVCTbwm3MDb9/1soqMt3pmMbo=&accesskey=P3UPCMORAFON76Q6RTNQ&expire=1436976000&nonce=4e1f2519c626cbfbab1520c255830c26&public=0&vdoid=12345