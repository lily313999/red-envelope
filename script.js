// script.js

// 定義所有紅包的ID
const envelopes = [
    'envelope1', 'envelope2', 'envelope3',
    'envelope4', 'envelope5', 'envelope6',
    'envelope7', 'envelope8', 'envelope9'
];

// 預設的隨機紅包內容
function generateImagePaths(folder, prefix, count) {
    return Array.from({ length: count }, (_, i) => `${folder}/${prefix}${i + 1}.png`);
}

// 生成紅包圖片
const rewards = generateImagePaths('a02', 'reward', 66);


// 特定暱稱的紅包內容（喵喵固定的圖片）
const specialRewards = [
    'a04/special1.png', 'a04/special2.png', 'a04/special3.png',
    'a04/special4.png', 'a04/special5.png', 'a04/special6.png',
    'a04/special7.png', 'a04/special8.png', 'a04/special9.png'
];

// 特定暱稱的紅包內容（打老虎固定的圖片）
const specialRewards2 = [
    'a03/tiger1.png', 'a03/tiger2.png', 'a03/tiger3.png',
    'a03/tiger4.png', 'a03/tiger5.png', 'a03/tiger6.png',
    'a03/tiger7.png', 'a03/tiger8.png', 'a03/tiger9.png'
];

// 特定暱稱的紅包內容（兔兔固定的圖片）
const specialRewards3 = [
    'a05/usagi1.png', 'a05/usagi2.png', 'a05/usagi3.png',
    'a05/usagi4.png', 'a05/usagi5.png', 'a05/usagi6.png',
    'a05/usagi7.png', 'a05/usagi8.png', 'a05/usagi9.png'
];

// 特定暱稱的紅包內容（青蛙固定的圖片）
const specialRewards4 = [
    'a06/f1.png', 'a06/f2.png', 'a06/f3.png',
    'a06/f4.png', 'a06/f5.png', 'a06/f6.png',
    'a06/f7.png', 'a06/f8.png', 'a06/f9.png'
];

// 定義紅包的HTML元素
const gameArea = document.getElementById('gameArea');
const resetButton = document.getElementById('resetButton');
const greetingMessage = document.getElementById('greetingMessage');
const nicknameSection = document.getElementById('nicknameSection');
const startButton = document.getElementById('startButton');
const greeting = document.getElementById('greeting');

// 定義換暱稱按鈕
const changeNicknameButton = document.getElementById('changeNicknameButton');

// 定義紅包初始背景圖
const envelopeBackgrounds = [
    'a01/bg1.png',
    'a01/bg2.png',
    'a01/bg3.png',
    'a01/bg4.png',
    'a01/bg5.png'
];


// 獲取音樂播放器元素
const backgroundMusic = document.getElementById('backgroundMusic');

// 設定音量為 50%
backgroundMusic.volume = 0.5;

// 在頁面載入時自動播放音樂
window.addEventListener('load', () => {
    backgroundMusic.play().catch((error) => {
        console.warn('自動播放受限：', error);
        // 如果瀏覽器阻止自動播放，可以顯示播放按鈕讓用戶啟動音樂
    });
});

// 在遊戲區域顯示時繼續播放音樂（確保不會中斷）
startButton.addEventListener('click', () => {
    backgroundMusic.play().catch((error) => {
        console.warn('播放受限：', error);
    });
});

// 設定紅包內容的變數
let currentRewards = [];

// 設定紅包點擊事件
function setupEnvelopes() {
    envelopes.forEach((id) => {
        const envelope = document.getElementById(id);

        // 隨機選擇一個背景圖片
        const randomBackground = envelopeBackgrounds[Math.floor(Math.random() * envelopeBackgrounds.length)];

        // 設定紅包的背景圖片
        envelope.style.backgroundImage = `url('${randomBackground}')`;

        envelope.addEventListener('click', () => {
            if (!envelope.classList.contains('opened')) {
                envelope.classList.add('opened');

                // 在紅包內插入圖片
                const imgElement = document.createElement('img');
                imgElement.src = currentRewards[envelopes.indexOf(id)]; // 設定紅包內容圖片
                imgElement.alt = '紅包內容';

                // 把圖片加入到紅包內
                envelope.appendChild(imgElement);
            }
        });
    });
}


// 隨機洗牌紅包內容
function shuffleRewards() {
    currentRewards = rewards.sort(() => Math.random() - 0.5); // 隨機排列紅包內容
}

// 顯示特定的紅包內容
function setSpecialRewards() {
    currentRewards = [...specialRewards]; // 設定為特定的圖片
}

function setSpecialRewards2() {
    const otherTigerImages = Array.from({ length: 25 }, (_, i) => `a03/tiger${i + 1}.png`).filter(img => img !== 'a03/tiger5.png');
    const shuffledImages = otherTigerImages.sort(() => Math.random() - 0.5);

    // 插入固定圖片到陣列的中間
    currentRewards = [
        ...shuffledImages.slice(0, 4),
        'a03/tiger5.png',
        ...shuffledImages.slice(4)
    ];
}

function setSpecialRewards3() {
    currentRewards = [...specialRewards3]; // 設定為特定的圖片
}

function setSpecialRewards4() {
    currentRewards = [...specialRewards4]; // 設定為特定的圖片
}

// 儲存初始的暱稱
let initialNickname = '';

// 處理暱稱輸入及顯示祝福
startButton.addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();

    if (nickname) {
 
        // 隱藏插圖
        const nicknameImageWrapper = document.getElementById('nicknameImageWrapper');
        nicknameImageWrapper.style.display = 'none'; // 隱藏插圖容器

       // 儲存初始暱稱
        initialNickname = nickname;

        // 隱藏暱稱輸入欄位，顯示祝福語句
        nicknameSection.style.display = 'none';
        greetingMessage.innerHTML = `祝福 <span class="nickname">${nickname}</span> 新年好運到，這是你的幸運紅包，快來抽獎吧！`;
        greeting.style.display = 'block';

        // 顯示遊戲區域
        gameArea.style.display = 'block';

        // 檢查是否是特定的暱稱
        if (nickname === '喵喵') {
            setSpecialRewards(); // 設置喵喵固定的紅包內容
        } else if (nickname === '今晚打老虎') {
            setSpecialRewards2(); // 設置打老虎固定的紅包內容
        } else if (nickname === '吟遊') {
            setSpecialRewards3(); // 設置兔兔固定的紅包內容
        } else if (nickname === '🐸') {
            setSpecialRewards4(); // 設置青蛙固定的紅包內容
        } else {
            shuffleRewards(); // 隨機洗牌紅包內容
        }

        // 初始化並顯示紅包
        setupEnvelopes();

        // 顯示再抽一次和換暱稱按鈕
        resetButton.style.display = 'inline-block';
        changeNicknameButton.style.display = 'inline-block';
    } else {
        alert('請輸入暱稱！');
    }
});

// 再抽一次功能
resetButton.addEventListener('click', () => {
    // 清除已開啟的紅包
    envelopes.forEach((id) => {
        const envelope = document.getElementById(id);
        envelope.classList.remove('opened');
        envelope.innerHTML = ''; // 清空紅包內容
    });

    // 根據最初輸入的暱稱重新設定紅包內容
    if (initialNickname === '喵喵') {
        setSpecialRewards(); // 如果最初是喵喵，則使用固定的紅包內容
    } else if (initialNickname === '今晚打老虎') {
        setSpecialRewards2(); // 如果最初是打老虎，則使用固定的紅包內容
    } else if (initialNickname === '吟遊') {
        setSpecialRewards3(); // 如果最初是吟遊，則使用固定的紅包內容
    } else if (initialNickname === '🐸') {
        setSpecialRewards4(); // 如果最初是青蛙，則使用固定的紅包內容
    } else {
        shuffleRewards(); // 否則隨機洗牌
    }
    
    // 重新設置紅包
    setupEnvelopes();
});


// 點擊換暱稱按鈕返回暱稱輸入頁面
changeNicknameButton.addEventListener('click', () => {

    // 顯示插圖
    nicknameImageWrapper.style.display = 'flex'; // 恢復插圖

    // 清空紅包內容和狀態
    envelopes.forEach((id) => {
        const envelope = document.getElementById(id);
        envelope.classList.remove('opened'); // 移除已開啟的類別
        envelope.innerHTML = ''; // 清空紅包內容
    });

    // 清空遊戲區域和按鈕
    gameArea.style.display = 'none';
    resetButton.style.display = 'none';
    changeNicknameButton.style.display = 'none';
    greeting.style.display = 'none';

    // 顯示暱稱輸入區域
    nicknameSection.style.display = 'block';
    document.getElementById('nickname').value = ''; // 清空輸入框
});