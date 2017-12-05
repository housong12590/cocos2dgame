package com.kx.cocos2dgame;

import android.webkit.WebView;
import android.webkit.WebViewClient;

public class SBWebViewClient extends WebViewClient {
    public void onPageFinished(WebView webView, String url) {
        webView.loadUrl("javascript:SmallBridge.setPlatform('android')");
    }
}