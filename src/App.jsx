import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Smartphone, Globe, ChevronDown, Check, Star, ShieldCheck, Zap, Menu, X, Monitor, Apple } from 'lucide-react';

// --- DATA APLIKASI ---
// Mengkategorikan aplikasi unggulan untuk styling khusus
const featuredAppsList = [
  "ChatGPT Pro", "Gemini AI Ultra", "ResearchRabbit Pro", "QuillBot Premium", 
  "Course Hero", "Turnitin Pro", "NoteGPT", "Netflix", "Studocu"
];

// Database Aplikasi lengkap
const allApps = [
    // Unggulan
    { name: "ChatGPT Pro", url: "https://groupy.id/assets/images/services/chatgptpro.png" },
    { name: "Gemini AI Ultra", url: "https://groupy.id/assets/images/services/gemini_ultra.png" },
    { name: "ResearchRabbit Pro", url: "https://pbs.twimg.com/profile_images/1983772825812189184/IXDTOqLX.jpg" },
    { name: "QuillBot Premium", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtqcA6rvxqQHSb14wu157jMKqBtXRNJ5-1lcBbxf4JzQt7vwDhlmbpnnH&s=10" },
    { name: "Course Hero", url: "https://play-lh.googleusercontent.com/FGtdclS6wXoOO9lA-9DkK9Skis0T-tY2SCFAl7wLX4ZDFSNO3RBADCEcnCMInsZCKlc" },
    { name: "Turnitin Pro", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIrf73LGu_mACI2Mc_jdghOV02eXRocoXKo0o3qZHFjGgJMUr5M_v8uwap&s=10" },
    { name: "NoteGPT", url: "https://10web.io/wp-content/uploads/2024/08/NoteGPT_logo.jpg" },
    { name: "Netflix", url: "https://groupy.id/assets/images/services/netflix.png" },
    { name: "Studocu", url: "https://play-lh.googleusercontent.com/20ssDWF3SWEXIFYy8iFwXjomuIqtuHjGc3OxIWqVojIaeo_9_XxUZEDdmm5YPreLucij" },
    
    // Sisa Aplikasi (Akan disortir A-Z nanti)
    { name: "Academia", url: "https://play-lh.googleusercontent.com/EpJMVmU4FP-cAyb_KwiFohiqBL24XVtomMMQPeFKxODrunPVdqr2IYRlARJNVjIiIWQ" },
    { name: "Alight Motion", url: "https://play-lh.googleusercontent.com/OU0BlP8C9-V7ECl2crma7B48nzDbK7liSLjn0j_fpTlyWG6qyEE-mw_KFZ9aOXF0a3w" },
    { name: "Apple Music", url: "https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE" },
    { name: "Apple TV+", url: "https://play-lh.googleusercontent.com/1XBAZjSOWaVM7UDFKvzuMR-WRoR5gCnsYrw17_ihHLcJKT9Qc7hXptHwWQ3Bf83mry4" },
    { name: "AskYourPDF", url: "https://play-lh.googleusercontent.com/WRl_6Jv1ljYKf3xiy27h3xx-ST7Kntg3mon8J53OBpjdm35jG2Mw80GZ2Qrhlau-YqI7=w240-h480-rw" },
    { name: "Bein Sports", url: "https://play-lh.googleusercontent.com/jBDZq3aBmCXuvtuJHEasqsdYPRxMBGzYmEha4dMlgoIk19Zlh6BGQC08Zt6Ifrmzhg=w240-h480-rw" },
    { name: "Brain.fm", url: "https://play-lh.googleusercontent.com/oQnd9u11H7j1g99Pzswt5LTm52g8XyMrgz0GRBX5lmzdPv2Vt7bBrOKgbVbs-gHc504=w240-h480-rw" },
    { name: "Brilliant", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07Aba7sYgSCOIW9P2mAWcAcO9r_tpM_svzw&s" },
    { name: "Bstation", url: "https://play-lh.googleusercontent.com/nug7F0n-jWMpAWLaU7Qi1kuTIYjrAtUJmZd5FW4mEyspYR7-zGa-3_fwnYkPgyzHozE3" },
    { name: "Busuu", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdfQ07W8Z1b0olxbugP-i2Hk5BJo6I-B8yKA&s" },
    { name: "Bypass | HIX AI", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXZQ0Wq17Y4CjDKiytXbd1hG39lu6u-rBsw&s" },
    { name: "BypassGPT", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpNp17p7NogV0-YTH9UnJYGg7IowMwYmj3w&s" },
    { name: "CapCut Website", url: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxtHdRB6xk71KqOPxE23.XPiUcBp9_h5.Va3lapJy.K9tACxvjL4_WF3lJCLozay.Kx6V1mfBFaOOF4V5Rx4RHLY-&format=source" },
    { name: "ChatGPT Plus", url: "https://groupy.id/assets/images/services/chatgptplus.png" },
    { name: "Chutes", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuJ8v1EICNl78zLPEfHkAimzusUBWT7z2nTw&s" },
    { name: "Codedex", url: "https://img.icons8.com/color/1200/clickup.jpg" },
    { name: "Consensus", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweoQJzl9iPGJqBYN-uOcjxdcH72RA9W1PKiCmAisHjg&s" },
    { name: "Coohom", url: "https://play-lh.googleusercontent.com/HWA5QTohakrzdjQnJWyPih_CDFubc9PZi0gW1v-eoopRUAGWpHspB-NeFBH3FQnQc6kz=w240-h480-rw" },
    { name: "Coursera", url: "https://play-lh.googleusercontent.com/H8crzfriK6t5b0N5wXykhxMjPopyWGDZPaMJlvWlAKb7EG-26KGu15P_RnFDinBw1Jc" },
    { name: "Crunchyroll", url: "https://groupy.id/assets/images/services/crunchyroll.png" },
    { name: "CryptoQuant", url: "https://cdn.prod.website-files.com/653c8107e2b70a34921d24fd/67a672f11fe6c47be600f037_cryptoquant.png" },
    { name: "Curiosity Stream", url: "https://play-lh.googleusercontent.com/YXqChSEFUdn1A9Jxu9sIZPwlyLYaA_sU_U_h-uW_RyXhEx1WzBNqNWcdNwC3WOGzjg" },
    { name: "DataCamp", url: "https://yt3.googleusercontent.com/ytc/AIdro_m6psai1Pd5oG3nGbw_hVfG-qmJ8R1ntco83MTXDf5cdoo=s900-c-k-c0x00ffffff-no-rj" },
    { name: "DeepL", url: "https://play-lh.googleusercontent.com/0IH4L3pX-jqQXKYCDmxTM5t3Tvak2cb_zUuIs9nKCHPeOqkaRJ_bRTq1qKawsSvunw=w240-h480-rw" },
    { name: "DeepSeek Pro", url: "https://pbs.twimg.com/ext_tw_video_thumb/1875845724925206528/pu/img/4T7PkBumsEAjZeO9.jpg" },
    { name: "DramaBox", url: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/86/MTA-182203320/no_brand_drama_box_full01_cpdx3p31.jpg" },
    { name: "Duolingo", url: "https://www.langoly.com/wp-content/uploads/2020/03/Duolingo-app-icon.png" },
    { name: "Flaticon", url: "https://groupy.id/assets/images/services/flaticon.png" },
    { name: "FlickReels", url: "https://yt3.googleusercontent.com/Nr6kUD1b72g6tdrtijUtuIFVFQK4UU_JRXT5_fv748Fj96fs6OWIYweCGSvE-G0azgWiFtSo=s900-c-k-c0x00ffffff-no-rj" },
    { name: "Freepik", url: "https://groupy.id/assets/images/services/freepik.png" },
    { name: "Gamma", url: "https://store-images.s-microsoft.com/image/apps.53673.13800228740496758.b926c1b0-f31a-4a9b-b1b3-88dd15f27137.a0a38389-643f-48ed-9379-92a9fb5a7c94" },
    { name: "Gemini AI Pro", url: "https://static.vecteezy.com/system/resources/previews/055/687/055/non_2x/rectangle-gemini-google-icon-symbol-logo-free-png.png" },
    { name: "Grammarly", url: "https://groupy.id/assets/images/services/grammarly.png" },
    { name: "Ground News", url: "https://play-lh.googleusercontent.com/61Y1REKFBgC1C6YxQwZA56516gR1zCw-HIaNyP_WV_MnR6Fuofzd8-uWBHzKxZP7mwM" },
    { name: "GuitarTricks", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlrIfBbD7fof4ZwKxkeWgU0t2u1lK7x_nPrA&s" },
    { name: "iflix", url: "https://play-lh.googleusercontent.com/_j_9jVM50j43oII8sejBsK4DkHXxFw_MYUQOcHNjgX7SgJMQiLUsa8BuKWGK_84H_OE" },
    { name: "iLoveIMG Pro", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVjyJOS7PN-2Xh37-pXo0aOghZLt45Fa2UBw&s" },
    { name: "iLovePDF Pro", url: "https://play-lh.googleusercontent.com/I5yxs1Pspu1rB3NPfqnoX2NscvfzAW7e3Zq5GGhXcr2g207X9-npiuP48Ys7107M1VvA" },
    { name: "iQYI", url: "https://groupy.id/assets/images/services/iqiyi.png" },
    { name: "Jitter", url: "https://yt3.googleusercontent.com/9CC-I1I2tcXcFJV-OGEfPPrHrKpKx-jR_KQJFMJtDivfJ6eFCleMtXFrIyysIu_2bGLg5sWO=s900-c-k-c0x00ffffff-no-rj" },
    { name: "LinkedIn Learning", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fcdsIUPUgmbvGaP-RC4RbHYdVtoN_fM8aya_8gOXI2BRtClESO-0_jgWTtKtIVmOQKs&usqp=CAU" },
    { name: "Marvel Unlimited", url: "https://play-lh.googleusercontent.com/ikcy-XJG8_oFwVztH9vK3y--_mUcRu5zyco7d4FqugxzSkX9wMo63oBDPLWZnUsYDg" },
    { name: "Masterclass", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeoBuunz4xK_-2t35N6astSudIfb7Bnr0R6HDcwoqbzmzOcuNpiZdiRFRv&s=10" },
    { name: "Medium", url: "https://miro.medium.com/v2/resize:fill:128:128/1*sHhtYhaCe2Uc3IU0IgKwIQ.png" },
    { name: "Melolo", url: "https://play-lh.googleusercontent.com/zLxJyyx3aGLSR63NvdVv6ERGaLwIujdCRwsEi_-G-6FhCzdrIGMKXUExLQWo29OcZ4A2" },
    { name: "Mentimeter", url: "https://images.saasworthy.com/mentimeter_870_logo_1600681783_e5oqu.png" },
    { name: "Mermaidchart", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMgbHVXJCw0zQzk3DtR607-823YIxR1Zi_Q&s" },
    { name: "Motion Array", url: "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/7c9c1870-7852-49ee-9df2-4b617e8df913.jpeg" },
    { name: "Mubi", url: "https://images.mubicdn.net/images/avatars/169655/cache-169655-1620041787/images-large.png?size=800x" },
    { name: "Musicbed", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRzHPEXnSURkOyU9StcI8BZPOTeqzvcJP_A&s" },
    { name: "NotebookLM", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJ_-m9Y994yfZimh_h8Yzn0sMx2IsfVoDIQ&s" },
    { name: "Notion", url: "https://play-lh.googleusercontent.com/vy-9s86d-81wk1acsXvAxN1xV5Y-doJdgbskG3GonOerbUwUtvNXk_XSRHoraaXZcX4" },
    { name: "Pacdora", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9l1bvE2alHZrnR4bmSsbK2KjHemNk_p4Dsf-GVh6-5hFtZgugYYNfQfo0L3CQxZqdLC4&usqp=CAU" },
    { name: "Paperpal", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsb2y412xVI5pSI0IiCzqNCF0RA7p-fxjNbg&s" },
    { name: "Perplexity", url: "https://play-lh.googleusercontent.com/6STp0lYx2ctvQ-JZpXA1LeAAZIlq6qN9gpy7swLPlRhmp-hfvZePcBxqwVkqN2BH1g" },
    { name: "Picsart", url: "https://play-lh.googleusercontent.com/1JMJ518jogwPeaD0pYn2mBu1cRLD0xRi45wNbtTIRvam1_xx-y3KJOjRAx-W9P4Lf0U=s256-rw" },
    { name: "Prezi AI", url: "https://play-lh.googleusercontent.com/3rVZ7Lc7-bxsALDo0nWOcuojR9ISxlhO20KnVM3uP00drxIXXt7ATM0V5-YjfM0pPtA" },
    { name: "Prime Video", url: "https://groupy.id/assets/images/services/primevideo.png" },
    { name: "ProductionCrate", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_sbW5wMx4hP2Y8wrJkjxjlSbrpy5f1Zgbw&s" },
    { name: "Quizlet", url: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/szx9duflfycmltpnvcvw" },
    { name: "Rawpixel", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq1xJnAZa_h6WueAi4mr73cH3K7_pGeTz6Gw&s" },
    { name: "Relume", url: "https://yt3.googleusercontent.com/MGRbvVhtCttJ7i2qW3igFxIJSkeoaRln_mIAFAfDgZIFD1yNUQC5mn1a5VqXKzcqRmAuDswu=s900-c-k-c0x00ffffff-no-rj" },
    { name: "Scholarcy", url: "https://yt3.googleusercontent.com/ytc/AIdro_kqv2zcFC4lZDK0qSXEbuI1Kcs5wYJoLmONwCf9QX3Qoc4=s900-c-k-c0x00ffffff-no-rj" },
    { name: "SciSpace", url: "https://assets-global.website-files.com/648302318a1143aaf5e78dfa/662e79fc151538445a578869_d3JYR823QfSPL1DkKG6V_6b34N9K4AGMJ21jH.png" },
    { name: "Scite", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHo4BcTYbuMiQFR7oUYKZy6zjOgzEORDrzeie96OS1sj3Ur0LpoCPV_ts&s=10" },
    { name: "Scribd", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebq-8lrzgXjVWMvUDApp_q1MhiL5eSyO15VAHMuNaE4RbrPi-f7c2NMc&s=10" },
    { name: "Semrush", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7TPtYsfoyLxuSORs6sqgApBGYHOx1aZ43ra1DqBNb8BRYz4ciWF4Mg9uR&s=10" },
    { name: "Shots", url: "https://pbs.twimg.com/profile_images/1517996453146378245/RTP0-Jy3_400x400.jpg" },
    { name: "Skillshare", url: "https://groupy.id/assets/images/services/skillshare.png" },
    { name: "slidesGO", url: "https://cdn-icons-png.flaticon.com/512/14649/14649063.png" },
    { name: "SlideShare", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFu2smlszvneX1otpsXxgwhKyPha7Boi8VJg&s" },
    { name: "Sololearn", url: "https://play-lh.googleusercontent.com/zxbe_H6JVg6ZnIeA1xorxxXr416kKdShmyonBzi5Qe28-GNdczX-NST_ul0AQJ007OA" },
    { name: "Sora Plus", url: "https://groupy.id/assets/images/services/sora_plus.png" },
    { name: "Speechify", url: "https://play-lh.googleusercontent.com/W0GcGHbSPEA2VBf8CM-SoRG9yYS2RwxgPM9Q25MmhmU6YzJ2t8lHIAnejL0nL9LvYwMx" },
    { name: "Superthread", url: "https://cdn-1.webcatalog.io/catalog/superthread/superthread-icon-filled-256.png?v=1719302832255" },
    { name: "SVGator", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXMLBuRJYssEV7zT3Lh8qRl-h2zuHgyEz2HA&s" },
    { name: "Symbolab", url: "https://play-lh.googleusercontent.com/DKlax_iJQtJOKJlIPDSS7DZpbm9gCkHh3vWgrj8BOMRwDPDVKXdTQf9sV4cRuXSdRA" },
    { name: "The Wall Street Journal", url: "https://play-lh.googleusercontent.com/eksxaPfxbTVb6VTl5aj1sXLpKc_N9Z6AZ3_5Oq6JhTXmgEQza-1v58a66p_ID0phE2Zv" },
    { name: "TraeAI", url: "https://pbs.twimg.com/profile_images/1946201092687114241/4X_B0XgN_400x400.png" },
    { name: "Turbo AI", url: "https://play-lh.googleusercontent.com/c678Vjj3oQ8UmrDCYzczS6JDcFor4XxHLnc2gAW9Wk_pbE3KEMw1WZk-rTPucPoV7Sg" },
    { name: "Udemy", url: "https://play-lh.googleusercontent.com/dsCkmJE2Fa8IjyXERAcwc5YeQ8_NvbZ4_OI8LgqyjILpXUfS5YhEcnAMajKPrZI-og" },
    { name: "Vectorizer AI", url: "https://cdn.prod.website-files.com/648e04d4bbae7004f1b35f15/65de13535268a099387a6f60_vectorizer-ai-icon.png" },
    { name: "Viu", url: "https://groupy.id/assets/images/services/viu.png" },
    { name: "WeTV", url: "https://groupy.id/assets/images/services/wetv.png" },
    { name: "vidIQ", url: "https://cdn.sanity.io/images/7g6d2cj1/production/7c8f9a95d01c8c4043af4f3c39940ba3870bb1a9-512x512.png?w=1200&q=70&auto=format" },
    { name: "WolframAlpha", url: "https://play-lh.googleusercontent.com/OceHg5bH7EsTRwl-lD7jjV9WM0mpj0oH4YfA-CSbjvfa7NCLQBu5-4cLwNlDvCUp5Q4" },
    { name: "WriteHuman", url: "https://earlyshark.com/wp-content/uploads/2024/01/writehuman-logo-1024x1024.png" },
    { name: "Virtual Threads", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_zqaiVJeMxFHsHmHsk8ViZdV3v-nd11cpPw&s" },
    { name: "Anara AI", url: "https://bookface-images.s3.amazonaws.com/logos/62cf2f3df0cbed090432578963a88c5ecff5d8eb.png?1741885621" },
    { name: "BlackBox AI", url: "https://play-lh.googleusercontent.com/Z_fquqqNzAd8FkpSjlnURnMtmLh8HRf_h_kIwhs0NbXKpO4WZ_fyZfi0f5yQsNmRL_lP" },
    { name: "Cursor AI", url: "https://miro.medium.com/v2/resize:fit:800/0*zWCTHFNFdGAgSw2d" },
    { name: "Eraser", url: "https://mavtools.com/wp-content/uploads/2024/05/Eraser.io-Logo.jpg" },
    { name: "IconScout", url: "https://cdn.iconscout.com/icon/free/png-256/free-iconscout-logo-icon-download-in-svg-png-gif-file-formats--company-pack-logos-icons-4674919.png" },
    { name: "Icons8", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9N3uKaUV5CRCvoZ0qP8eVKwniwK6DKqBBw&s" },
    { name: "Humata AI", url: "https://www.humata.ai/favicon.ico" },
    { name: "HBO Max", url: "https://play-lh.googleusercontent.com/bvyVXgpxu65YO3PNeVhNM9Y7ao7g7FnnKdoNXcwqO48aOlVvnH_b2O9rcZzgEFHzHtI" },
    { name: "Julius AI", url: "https://pbs.twimg.com/profile_images/1108338370026053632/JrSrbA-c_400x400.png" },
    { name: "Leonardo AI", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJztEc1YalQNx74GGv9upR6MXHYGO4H0ejqg&s" },
    { name: "Jenni AI", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzHV0xQOmnu0xowDdW71mIklQHOJ7RjdzHg&s" },
    { name: "Merlin AI", url: "https://play-lh.googleusercontent.com/8XoSS1Jn3qHfm8cB4gq6YMQAWv_PIRCUtH2r5RiDq0s05QM47JtwEjs6V_aFh_SmOZ0" },
    { name: "Sider AI", url: "https://play-lh.googleusercontent.com/VghuZRn0-oLvbaGqptsM-9Qr6Ka7Pmw7lfmu6_UQ56mZS6bsXbET9Uf0wF0FECP8lEM" },
    { name: "SuperGrok", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfDfKMTEJFYyKr-VgVN0z7sdgoINjKnomLLw&s" },
    { name: "Trading View", url: "https://groupy.id/assets/images/services/tradingview.png" },
    { name: "z.ai API", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Z.ai_%28company_logo%29.svg/1200px-Z.ai_%28company_logo%29.svg.png" }
];

// Hook untuk animasi saat elemen masuk viewport
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIntersecting(true);
            observer.disconnect(); // Hanya animasi sekali
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}

// Komponen Reveal untuk animasi
const Reveal = ({ children, delay = 0, className = "", rootMargin = "-50px" }) => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref, rootMargin);

    return (
        <div 
            ref={ref}
            className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const App = () => {
    // Styling Fonts
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: 'Poppins', sans-serif; }`;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // State untuk Paket
    const [priceMode30, setPriceMode30] = useState('individu'); // individu | invite
    const [priceMode90, setPriceMode90] = useState('invite'); // DEFAULT set to 'invite'

    // SORTING APLIKASI
    // 1. Pisahkan Featured dan Non-Featured
    const featuredApps = allApps.filter(app => featuredAppsList.includes(app.name));
    
    // 2. Sortir Non-Featured secara A-Z
    const nonFeaturedApps = allApps
        .filter(app => !featuredAppsList.includes(app.name))
        .sort((a, b) => a.name.localeCompare(b.name));

    // Fungsi handle klik WhatsApp
    const handlePurchase = (packageType, mode, price) => {
        const phoneNumber = "6285179852558";
        let message = "";

        if (packageType === "30") {
            if (mode === "individu") {
                message = "Halo Admin, saya ingin membeli Paket Starter 30 Hari (Individu) seharga Rp98.000.";
            } else {
                message = "Halo Admin, saya ingin klaim promo Paket Starter 30 Hari (Wajib Invite 3 Teman) seharga Rp35.000.";
            }
        } else if (packageType === "90") {
            if (mode === "individu") {
                message = "Halo Admin, saya ingin membeli Paket Pro 90 Hari (Individu) seharga Rp290.000.";
            } else {
                message = "Halo Admin, saya ingin klaim promo Paket Pro 90 Hari (Wajib Invite 3 Teman) seharga Rp97.000.";
            }
        }

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // FAQ Data
    const faqs = [
        {
            q: "Apa itu \"App Premium 1 Extension\"?",
            a: "Ini adalah solusi praktis dari Hallo Abdi Store di mana Anda bisa mengakses berbagai aplikasi premium (seperti Netflix, Spotify, Canva, dll) hanya dengan menginstal satu ekstensi browser. Anda tidak perlu lagi login-logout manual atau memasukkan password satu per satu; cukup klik ekstensi, dan akses premium langsung aktif."
        },
        {
            q: "Di perangkat dan browser apa saja ekstensi ini bisa digunakan?",
            a: (
                <div className="space-y-2 mt-2">
                    <p>Ekstensi kami sangat fleksibel dan mendukung berbagai platform:</p>
                    <ul className="list-none space-y-1">
                        <li className="flex items-center gap-2"><Laptop size={16} className="text-blue-400" /> <span>Laptop/PC (Windows & Mac): Google Chrome dan Microsoft Edge.</span></li>
                        <li className="flex items-center gap-2"><Smartphone size={16} className="text-green-400" /> <span>Android: Menggunakan browser Mises.</span></li>
                        <li className="flex items-center gap-2"><Apple size={16} className="text-gray-200" /> <span>iOS (iPhone/iPad): Menggunakan browser Safari.</span></li>
                    </ul>
                </div>
            )
        },
        {
            q: "Saya membeli paket \"Individu\", apakah akun aplikasinya menjadi Private (milik sendiri)?",
            a: "Penting untuk dipahami bahwa paket \"Individu\" mengacu pada lisensi penggunaan ekstensi untuk Anda sendiri (satu pengguna/device). Namun, akun aplikasi premium yang tertanam di dalam ekstensi tersebut sistemnya adalah Sharing (akun bersama). Ekstensi ini berfungsi sebagai \"kunci\" untuk masuk ke akun-akun sharing tersebut secara otomatis dan aman."
        },
        {
            q: "Apakah aman menggunakan ekstensi ini di browser saya?",
            a: "Sangat aman. Ekstensi Hallo Abdi Store hanya bekerja untuk meloginkan Anda ke layanan premium yang tersedia dalam paket. Ekstensi ini tidak mengambil data pribadi, history browsing, atau password akun pribadi Anda yang lain (seperti email atau sosial media)."
        },
        {
            q: "Apa yang harus dilakukan jika akses premium tiba-tiba terputus atau error?",
            a: "Karena sistemnya berbasis ekstensi, pembaruan (update) terkadang diperlukan. Jika terjadi kendala, Anda cukup menghubungi tim support Hallo Abdi Store untuk mendapatkan panduan pembaruan ekstensi atau perbaikan akses. Semua paket kami dilengkapi garansi selama masa berlangganan aktif."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
            
            {/* --- NAVBAR --- */}
            <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white text-lg">A</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">HALLO ABDI STORE</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#beranda" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Beranda</a>
                                <a href="#list-app" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">List App</a>
                                <a href="#paket" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Harga</a>
                                <a href="#faq" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- BERANDA / HERO --- */}
            <section id="beranda" className="pt-32 pb-20 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Reveal>
                        <span className="inline-block py-1 px-3 rounded-full bg-gray-800 border border-gray-700 text-yellow-400 text-xs font-semibold tracking-wide uppercase mb-4">
                            #1 Solusi Hemat Langganan
                        </span>
                    </Reveal>
                    
                    <Reveal delay={100}>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            HALLO ABDI STORE <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 animate-gradient-x">
                                App Premium in 1 Extension
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal delay={200}>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                            Hallo Abdi Store adalah sebuah toko yang menjual berbagai paket dan aplikasi premium. Website ini menjual 1 paket berbagai App Premium dalam 1 ekstension.
                        </p>
                    </Reveal>

                    <Reveal delay={300}>
                         <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                                <Monitor size={18} className="text-blue-400" /> Chrome & Edge Desktop
                            </div>
                            <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                                <Smartphone size={18} className="text-green-400" /> Mises for Android
                            </div>
                            <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                                <Globe size={18} className="text-indigo-400" /> Safari for Apple
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={400}>
                        <div className="mt-10">
                            <a href="#list-app" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 md:text-lg transition-all shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1">
                                <Zap className="mr-2" size={20} fill="black" />
                                Segera Cek App Premium
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* --- LIST APP PREMIUM --- */}
            <section id="list-app" className="py-20 bg-gray-950 relative">
                <div className="max-w-[1400px] mx-auto px-4">
                    <Reveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-2">Daftar Aplikasi Premium</h2>
                            <p className="text-gray-400">Semua aplikasi ini ada dalam satu genggaman ekstensi.</p>
                        </div>
                    </Reveal>
                    
                    {/* Grid Container */}
                    {/* UPDATED GRID: Mobile 3 cols, Tablet (md) 5 cols, Desktop (lg) 12 cols */}
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-12 gap-3 md:gap-4">
                        
                        {/* 1. Render Featured Apps (Unggulan) First with Diamond Blue Glow */}
                        {featuredApps.map((app, index) => (
                             <Reveal key={`featured-${index}`} delay={index * 50} className="col-span-1" rootMargin="1000px">
                                <div className="group relative aspect-square rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-cyan-500/70 overflow-hidden hover:scale-105 transition-transform duration-300">
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-full group-hover:animate-shine z-20"></div>
                                    
                                    <div className="h-full w-full bg-gray-900 rounded-[14px] flex flex-col items-center justify-between p-2 relative z-10">
                                        <div className="absolute top-1 right-1">
                                            <Star size={10} className="text-cyan-300 fill-cyan-300" />
                                        </div>
                                        {/* Container Image */}
                                        <div className="flex-grow flex items-center justify-center w-full">
                                            <img 
                                                src={app.url} 
                                                alt={app.name} 
                                                loading="lazy"
                                                className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-lg"
                                                onError={(e) => {e.target.src = 'https://via.placeholder.com/100?text=App'}}
                                            />
                                        </div>
                                        {/* Container Text */}
                                        <div className="w-full mt-1 min-h-[24px] flex items-center justify-center px-1 pb-1">
                                            <p className="text-[10px] md:text-xs font-semibold text-center text-cyan-50 leading-tight w-full break-words">
                                                {app.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}

                        {/* 2. Render Remaining Apps (SORTED A-Z) */}
                        {nonFeaturedApps.map((app, index) => (
                            <Reveal key={`std-${index}`} delay={(index + 9) * 30} className="col-span-1" rootMargin="1000px">
                                <div className="group h-full aspect-square bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl flex flex-col items-center justify-between p-2 transition-all duration-300 hover:bg-gray-800 hover:shadow-xl">
                                     <div className="flex-grow flex items-center justify-center w-full">
                                        <img 
                                            src={app.url} 
                                            alt={app.name} 
                                            loading="lazy"
                                            className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-md transition-all duration-500"
                                            onError={(e) => {e.target.src = 'https://via.placeholder.com/100?text=App'}}
                                        />
                                    </div>
                                    <div className="w-full mt-1 min-h-[20px] flex items-center justify-center">
                                        <p className="text-[9px] md:text-[10px] font-medium text-center text-gray-400 group-hover:text-white leading-tight w-full break-words">
                                            {app.name}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PILIH PAKET --- */}
            <section id="paket" className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white">Pilih Paket Langganan</h2>
                            <p className="text-gray-400 mt-2">Investasi terbaik untuk produktivitas tanpa batas.</p>
                        </div>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        
                        {/* Paket 30 Hari */}
                        <Reveal delay={100} className="h-full">
                            <div 
                                className={`h-full bg-gray-900 border rounded-3xl p-8 transition-all duration-300 relative flex flex-col
                                ${priceMode30 === 'invite' 
                                    ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]' 
                                    : 'border-gray-800 hover:border-gray-600'
                                }`}
                            >
                                {/* BEST CHOICE Badge for Invite Mode */}
                                {priceMode30 === 'invite' && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg animate-pulse">
                                        BEST CHOICE
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold text-gray-300 mb-2">Paket Starter</h3>
                                <div className="text-4xl font-bold text-white mb-1">30 Hari</div>
                                <p className="text-gray-500 text-sm mb-6">Akses penuh selama satu bulan.</p>
                                
                                {/* Dropdown Logic UI */}
                                <div className="bg-gray-950 rounded-xl p-1 mb-6 flex relative">
                                    <button 
                                        onClick={() => setPriceMode30('individu')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${priceMode30 === 'individu' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Individu
                                    </button>
                                    <button 
                                        onClick={() => setPriceMode30('invite')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${priceMode30 === 'invite' ? 'bg-cyan-900/50 text-cyan-400 shadow' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        Invite 3 Teman
                                    </button>
                                </div>

                                <div className="mb-8 flex-grow">
                                    {priceMode30 === 'individu' ? (
                                        <div className="animate-fade-in">
                                            <span className="text-3xl font-bold text-white">Rp98.000</span>
                                            <span className="text-gray-500"> / bulan</span>
                                        </div>
                                    ) : (
                                        <div className="animate-fade-in">
                                             <span className="text-3xl font-bold text-cyan-400">Rp35.000</span>
                                             <div className="text-xs text-red-400 font-medium mt-1">*Wajib invite 3 teman</div>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={() => handlePurchase("30", priceMode30)}
                                    className={`w-full py-3 rounded-xl border font-semibold transition-colors ${priceMode30 === 'invite' ? 'bg-cyan-500 border-cyan-500 text-black hover:bg-cyan-400' : 'border-gray-600 hover:bg-gray-800'}`}
                                >
                                    Pilih Paket 30 Hari
                                </button>
                            </div>
                        </Reveal>

                        {/* Paket 90 Hari (BEST SELLER) */}
                        <Reveal delay={200} className="h-full">
                            {/* Conditional Rendering for Container Style */}
                            <div 
                                className={`h-full rounded-3xl relative flex flex-col transition-all duration-300
                                ${priceMode90 === 'invite' 
                                    ? 'p-[2px] bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-600' // Fancy Border
                                    : 'bg-gray-900 border border-gray-800 hover:border-gray-600' // Normal Border
                                }`}
                            >
                                {/* Best Seller Badge Only shown in Invite Mode or if you prefer always? usually logic implies best seller is the deal */}
                                {priceMode90 === 'invite' && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
                                        BEST SELLER
                                    </div>
                                )}

                                <div className={`bg-gray-900 rounded-[22px] h-full p-8 flex flex-col ${priceMode90 === 'individu' ? 'rounded-3xl' : ''}`}>
                                    <h3 className={`text-xl font-semibold mb-2 ${priceMode90 === 'invite' ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : 'text-gray-300'}`}>Paket Pro</h3>
                                    <div className="text-4xl font-bold text-white mb-1">90 Hari</div>
                                    <p className="text-gray-500 text-sm mb-6">Lebih hemat untuk jangka panjang.</p>

                                    {/* Dropdown Logic UI */}
                                    <div className="bg-gray-950 rounded-xl p-1 mb-6 flex relative border border-gray-800">
                                        <button 
                                            onClick={() => setPriceMode90('individu')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${priceMode90 === 'individu' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Individu
                                        </button>
                                        <button 
                                            onClick={() => setPriceMode90('invite')}
                                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${priceMode90 === 'invite' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-bold shadow' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Invite 3 Teman
                                        </button>
                                    </div>

                                    <div className="mb-8 flex-grow">
                                        {priceMode90 === 'individu' ? (
                                            <div className="animate-fade-in">
                                                <span className="text-3xl font-bold text-white">Rp290.000</span>
                                                <span className="text-gray-500"> / 3 bulan</span>
                                            </div>
                                        ) : (
                                            <div className="animate-fade-in">
                                                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Rp97.000</span>
                                                <div className="text-xs text-yellow-600 font-medium mt-1">*Promo Spesial Invite 3 Teman</div>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => handlePurchase("90", priceMode90)}
                                        className={`w-full py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1 ${priceMode90 === 'invite' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg hover:shadow-orange-500/25' : 'border border-gray-600 text-white hover:bg-gray-800 font-semibold'}`}
                                    >
                                        {priceMode90 === 'invite' ? 'Ambil Promo 90 Hari' : 'Pilih Paket 90 Hari'}
                                    </button>
                                </div>
                            </div>
                        </Reveal>

                    </div>
                </div>
            </section>

            {/* --- FAQ --- */}
            <section id="faq" className="py-20 bg-gray-950">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <Reveal>
                        <h2 className="text-3xl font-bold text-center text-white mb-12">Pertanyaan Umum (FAQ)</h2>
                    </Reveal>
                    
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <FAQItem key={index} question={item.q} answer={item.a} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white text-lg">A</span>
                        </div>
                        <span className="text-white font-bold text-xl">HALLO ABDI STORE</span>
                    </div>
                    <p className="text-gray-500 text-sm text-center md:text-right">
                        © {new Date().getFullYear()} Hallo Abdi Store. All rights reserved.<br/>
                        App Premium in 1 Extension.
                    </p>
                </div>
            </footer>
        </div>
    );
};

// Sub-Component untuk Item FAQ agar kode lebih rapi
const FAQItem = ({ question, answer, index }) => {
    // Diubah menjadi false agar defaultnya tertutup semua
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <Reveal delay={index * 100}>
            <div className="border border-gray-800 rounded-xl bg-gray-900/50 overflow-hidden">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                >
                    <span className="font-medium text-gray-200">{question}</span>
                    <ChevronDown className={`transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </button>
                <div className={`px-6 text-gray-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-4 border-t border-gray-800' : 'max-h-0'}`}>
                    {answer}
                </div>
            </div>
        </Reveal>
    );
};

export default App;
