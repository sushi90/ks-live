'use strict'

const EOL = '\n'
const crypto = require('crypto')

class KSLive {
  constructor (ak, sk) {
    this.ak = ak
    this.sk = sk
  }

  /**
   * dName  域名标识
   * app    频道名
   * stream 流名
   */
  createRTMPUrl (dName, app, stream, opts) {
    opts = opts || {}

    // 设置过期时间为五分钟后
    let expire = ~~(new Date().getTime() / 1000) + 60 * 5
    expire = opts['expire'] = opts['expire'] || expire

    let resource = opts['resource'] = opts['resource'] || {}
    let nonce = resource['nonce'] = resource['nonce'] || ''
    let isPublic = resource['public'] = isNaN(resource['public']) ? 1 : resource['public']
    let vdoid = resource['vdoid'] = resource['vdoid'] || ''

    let signature = generateSignature(this.sk, opts)
    let url = `rtmp://${dName}.uplive.ks-cdn.com/${app}/${stream}?signature=${signature}&accesskey=${this.ak}&expire=${expire}`
    if (nonce) {
      url += `&nonce=${nonce}`
    }
    if (!isNaN(isPublic)) {
      url += `&public=${isPublic}`
    }
    if (vdoid) {
      url += `&vdoid=${vdoid}`
    }
    return url
  }
}

function generateSignature (sk, opts) {
  let stringToSign = `GET${EOL}`
  stringToSign += opts['expire']
  let resource = opts['resource']
  let nonce = resource['nonce']
  let isPublic = resource['public']
  let vdoid = resource['vdoid']
  if (nonce) {
    stringToSign += `${EOL}nonce=${nonce}`
  }
  if (!isNaN(isPublic)) {
    stringToSign += `&public=${isPublic}`
  }
  if (vdoid) {
    stringToSign += `&vdoid=${vdoid}`
  }
  return base64(hashMacSha1(sk, stringToSign))
}

function hashMacSha1 (sk, content) {
  var hmac = crypto.createHmac('sha1', sk)
  hmac.update(content)
  return hmac.digest()
}

function base64 (content) {
  return new Buffer(content).toString('base64')
}

module.exports = KSLive
