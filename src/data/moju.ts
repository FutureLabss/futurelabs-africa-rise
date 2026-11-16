// Moju, the live camera app from FutureLabs Studio. Shown on /moju and as a card on /studio.
//
// The APK is a GitHub Release on FutureLabss/moju (public). The "latest" link always serves the
// release marked latest there, so a new version needs no change here except `version` and `size`.
// Publish from the Moju app repo (FutureLabss/moju-app): scripts/publish.ps1.

export const MOJU = {
  version: '0.1.0',
  size: '56.2 MB',
  minAndroid: '6.0',
  apk: 'https://github.com/FutureLabss/moju/releases/latest/download/Moju.apk',
  releases: 'https://github.com/FutureLabss/moju/releases',
} as const;

export const MOJU_STEPS = [
  {
    title: 'Install Moju',
    text: 'On any Android phone on the same network as your streaming PC.',
  },
  {
    title: 'Pick your software',
    text: 'Moju looks for OBS and vMix on the network and shows what it finds. Tap one.',
  },
  {
    title: 'Tap GO',
    text: 'Your camera appears in OBS or vMix, named after your phone, in about a second.',
  },
];

export const MOJU_FEATURES = [
  {
    tag: 'No setup',
    title: 'Finds your PC by itself',
    text: 'Moju adds its own camera to OBS with low-delay settings. In vMix, pick a port and go.',
  },
  {
    tag: 'Smooth',
    title: 'Softer, never broken',
    text: 'When Wi-Fi dips, Moju eases the quality within a second instead of letting the picture crack.',
  },
  {
    tag: 'Reliable',
    title: 'Comes back by itself',
    text: 'Lose the network for a moment and Moju reconnects on its own. No one has to touch the phone.',
  },
  {
    tag: 'Pro camera',
    title: 'Real camera control',
    text: 'Switch lenses, lock exposure, focus and white balance in one tap, and set ISO and shutter. 1/50 stops flicker under mains lights.',
  },
  {
    tag: 'Long services',
    title: 'Runs for hours',
    text: 'Dim the screen and keep streaming. Battery and heat are always one tap away.',
  },
  {
    tag: 'Your look',
    title: 'Colour that streams',
    text: 'Vivid, Warm, Cool, Flat or Mono, applied before the video leaves the phone.',
  },
];

export const MOJU_INSTALL = [
  'Tap Download. If Chrome says the file might be harmful, tap Download anyway.',
  'Open the downloaded file. If Android asks, allow installs from this source, then go back.',
  'Tap Install. If Play Protect asks, tap More details, then Install anyway.',
  'Open Moju, choose Stream to my PC, and allow the camera and microphone.',
];

export const MOJU_WORKS_WITH = ['OBS Studio', 'vMix', 'YouTube Live', 'Facebook Live', 'Any SRT or RTMP receiver'];
