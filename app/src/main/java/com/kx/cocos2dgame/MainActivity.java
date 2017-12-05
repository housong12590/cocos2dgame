package com.kx.cocos2dgame;

import android.content.res.AssetFileDescriptor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.WindowManager;
import android.widget.Toast;

import java.io.IOException;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "cocos2d";
    private static final String index = "file:///android_asset/cocos2d-html5/Maze/index.html";
    private static final String audioPath = "cocos2d-html5/Maze/res/audio/%s/%s";
    private long mExitTime = 0;
    private MediaPlayer musicPlayer;
    private MediaPlayer effectPlay;
    private SBWebView webView;
    private boolean isMute;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_main);
        webView = (SBWebView) findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.setWebChromeClient(getWebClient());
        SPUtils.init(getApplicationContext());
        initMediaPlayer();
        webView.loadUrl(index);
    }


    private SBWebChromeClient getWebClient() {
        return new SBWebChromeClient() {
            @Override
            public boolean onReceiveMessage(String source, String message) {
                parseAction(message);
                return true;
            }
        };
    }

    private void parseAction(String message) {
        Log.e(TAG, message);
        String[] split = message.split(":");
        String action = split[0];
        switch (action) {
            //播放背景音效
            case "playmusic":
                String musicValue = split[1];
                String musicPath = String.format(audioPath, "background", String.format("background_%s.mp3", musicValue));
                playMusic(musicPath);
                Log.d(TAG, action + "->" + musicPath);
                break;
            //播放游戏音效
            case "playeffect":
                String effectValue = split[1];
                String ffectPath = String.format(audioPath, "effect", String.format("effect_%s.mp3", effectValue));
                playEffect(ffectPath);
                Log.d(TAG, action + "->" + ffectPath);
                break;
            //获取游戏进度
            case "gethistory":
                String history = SPUtils.getInstance().getString("history");
                webView.sendMessage(this, TextUtils.isEmpty(history) ? "emptyhistory" : ("history:" + history));
                break;
            //保存游戏进度
            case "savehistory":
                SPUtils.getInstance().put("history", split[1]);
                break;
            //开关声音
            case "mutemusic":
                isMute = split[1].equals("1");
                mutemusic();
                break;
            //退出游戏
            case "quitegame":
                finish();
                break;
        }
    }

    private void mutemusic() {
        if (isMute) {
            musicPlayer.pause();
            effectPlay.reset();
        } else {
            musicPlayer.start();
        }
    }

    private void initMediaPlayer() {
        if (musicPlayer == null) {
            musicPlayer = new MediaPlayer();
            musicPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        }
        if (effectPlay == null) {
            effectPlay = new MediaPlayer();
            effectPlay.setAudioStreamType(AudioManager.STREAM_MUSIC);
        }
    }

    private void playMusic(String path) {
        if (isMute) {
            return;
        }
        try {
            stopMusic();
            AssetFileDescriptor fd = getAssets().openFd(path);
            musicPlayer.setDataSource(fd.getFileDescriptor(), fd.getStartOffset(), fd.getLength());
            musicPlayer.setLooping(true);
            musicPlayer.prepare();
            musicPlayer.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void playEffect(String path) {
        if (isMute) {
            return;
        }
        try {
            stopEffect();
            AssetFileDescriptor fd = getAssets().openFd(path);
            effectPlay.setDataSource(fd.getFileDescriptor(), fd.getStartOffset(), fd.getLength());
            effectPlay.prepare();
            effectPlay.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void stopMusic() {
        if (musicPlayer != null) {
            if (musicPlayer.isPlaying()) {
                musicPlayer.stop();
            }
            musicPlayer.reset();
        }
    }

    private void stopEffect() {
        if (effectPlay != null) {
            if (effectPlay.isPlaying()) {
                effectPlay.stop();
            }
            effectPlay.reset();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (musicPlayer != null) {
            musicPlayer.start();
        }
        ScreenRotateUtil.getInstance(this).start(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (musicPlayer != null) {
            musicPlayer.pause();
        }
        if (effectPlay != null) {
            effectPlay.pause();
        }
        ScreenRotateUtil.getInstance(this).stop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (musicPlayer != null) {
            musicPlayer.release();
        }
        if (musicPlayer != null) {
            musicPlayer.release();
        }
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            if ((System.currentTimeMillis() - mExitTime) > 2000) {
                Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
                mExitTime = System.currentTimeMillis();
            } else {
                finish();
            }
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
