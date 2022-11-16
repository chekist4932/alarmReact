import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';



Audio.setAudioModeAsync({
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    playsInSilentModeIOS: true,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix

});
const playbackInstance = new Audio.Sound();

export async function playRadio(radio_url) {
    try {
        console.log("radio PLAY")
        await playbackInstance.loadAsync({uri:radio_url});
        await playbackInstance.playAsync();
    } catch (err) {
        await playbackInstance.unloadAsync()
        await playbackInstance.loadAsync({uri:radio_url});
        await playbackInstance.playAsync();
        console.log(err);
    }
}

export async function stopRadio()
{
    try {
        await playbackInstance.unloadAsync();
    } catch (err) {
        console.log(err);
    }
}
