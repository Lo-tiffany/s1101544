let players; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌
//YouTube API Ready
function onYouTubeIframeAPIReady(){
    players = new YT.Player("player",{
    height:"270",
    width:"480",
    videoId:playList[currentPlay],
    playerVars:{
    autoplay:0, //是否自動撥放
    controls:0, //是否顯示控制項
    start:playTime[currentPlay][0],//開始秒數
    end:playTime[currentPlay][1],//結束秒數
    iv_load_policy:3
    },
    events:{
    onReady:onPlayerReady,
    onStateChange:onPlayerStateChange
    }
    });
    }
//YouTube Player Ready
    function onPlayerReady(e) {
        const play = document.getElementById('play');
        const pause = document.getElementById('pause');
        const stop = document.getElementById('stop');
    
        const back = document.getElementById('back');
        const forward = document.getElementById('forward');
    
        const rate = document.getElementById('rate');
    
        const volume = document.getElementById('volume');
        const mute = document.getElementById('toggleMute');
    
        //- 播放、暫停、停止
        play.addEventListener('click', () => {
          mute.checked = true;
          e.target.mute().playVideo();
        });
        pause.addEventListener('click', () => e.target.pauseVideo());
        stop.addEventListener('click', () => e.target.stopVideo());
    
        // 後退、前進10秒
        back.addEventListener('click', () => {
          // 先抓到目前秒數
          let current = e.target.getCurrentTime();
          // 後退10秒：目前秒數 - 10
          e.target.seekTo(current - 10);
        });
        forward.addEventListener('click', () => {
          // 先抓到目前秒數
          let current = e.target.getCurrentTime();
          // 前進10秒：目前秒數 + 10
          e.target.seekTo(current + 10);
        });
    
        //- 速度
        rate.value = e.target.getPlaybackRate(); // 先抓目前的速度
        rate.addEventListener('input', () => e.target.setPlaybackRate(Number(rate.value)))
    
        //- 音量
        volume.value = e.target.getVolume(); // 先抓目前的音量
        volume.addEventListener('input', () => e.target.setVolume(volume.value))
    
        //- 靜音
        //- 有聲的情況下無法自動播放，因此不執行 playVideo
        mute.addEventListener('change', () => mute.checked ? e.target.mute().playVideo() : e.target.unMute());
      }

//Player State Change
function onPlayerStateChange(event){
    if(Math.floor(players.getCurrentTime())==playTime[currentPlay][1]){
    if(currentPlay<playList.length-1){
    currentPlay++;
    players.loadVideoById({
    videoId:playList[currentPlay],
    startSeconds:playTime[currentPlay][0],
    endSeconds:playTime[currentPlay][1],
    suggestedQuality:"large"
    });
    }else{
    currentPlay=0;
    players.cueVideoById({
    videoId:playList[currentPlay],
    startSeconds:playTime[currentPlay][0],
    endSeconds:playTime[currentPlay][1],
    suggestedQuality:"large"
    });
    }
    }
    $("h4").text(players.getVideoData().title);
    }
