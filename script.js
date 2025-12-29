// JavaScript for New Year's Day Wishes Page

// 页面加载完成后执行


/**
 * 倒计时功能
 */
function initCountdown() {
    // 目标日期：下一年的1月1日
    const now = new Date();
    const targetYear = now.getFullYear() + 1;
    const targetDate = new Date(targetYear, 0, 1, 0, 0, 0);
    
    // 获取DOM元素
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // 更新倒计时
    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;
        
        // 如果已经到了新年
        if (timeLeft <= 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }
        
        // 计算剩余时间
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // 更新DOM
        daysElement.textContent = formatNumber(days);
        hoursElement.textContent = formatNumber(hours);
        minutesElement.textContent = formatNumber(minutes);
        secondsElement.textContent = formatNumber(seconds);
    }
    
    // 格式化数字，确保两位数
    function formatNumber(num) {
        return num < 10 ? '0' + num : num;
    }
    
    // 立即更新一次
    updateCountdown();
    
    // 每秒更新一次
    setInterval(updateCountdown, 1000);
}

/**
 * 雪花动画功能
 */
/**
 * 优化后的雪花效果
 */
function initSnow() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 80; // 减少雪花数量以提高性能
    const snowflakeChars = ['❄', '❅', '❆', '❄', '❅', '❆'];
    
    // 预创建所有雪花
    function createSnowflakes() {
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
            
            // 随机位置和大小
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.fontSize = Math.random() * 10 + 8 + 'px';
            
            // 随机动画持续时间
            const duration = Math.random() * 15 + 10;
            snowflake.style.animationDuration = duration + 's';
            
            // 随机动画延迟
            snowflake.style.animationDelay = Math.random() * 10 + 's';
            
            // 随机透明度
            snowflake.style.opacity = Math.random() * 0.7 + 0.3;
            
            // 随机水平移动幅度
            snowflake.style.setProperty('--horizontal-movement', Math.random() * 50 + 20 + 'px');
            
            // 添加到容器
            snowContainer.appendChild(snowflake);
            
            // 添加动画结束事件监听器，重新定位雪花
            snowflake.addEventListener('animationiteration', function() {
                // 雪花动画循环结束时，重新定位到顶部
                this.style.left = Math.random() * 100 + '%';
                this.style.transform = 'translateX(0) translateY(-100%)';
            });
        }
    }
    
    // 初始化雪花
    createSnowflakes();
}

/**
 * 音乐控制功能
 */
function initMusicControl() {
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = document.querySelector('.music-icon');
    let isPlaying = false;
    
    // 点击按钮切换音乐播放状态（仅视觉效果）
    musicBtn.addEventListener('click', function() {
        isPlaying = !isPlaying;
        musicIcon.style.animationPlayState = isPlaying ? 'running' : 'paused';
    });
}

/**
 * 添加页面加载动画
 */
window.addEventListener('load', function() {
    // 添加页面淡入效果
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// --------------------------
// 全局变量声明
// --------------------------

// 鼠标位置跟踪
let mouseX = 0;
let mouseY = 0;

// 连击系统
let wishCount = 0;
let lastWishTime = 0;
let comboCount = 1;
let maxCombo = 1;
let comboTimer = null;
const COMBO_WINDOW = 1000; // 连击窗口时间（毫秒）

// 粒子系统
let particlePool;

function updateMousePosition(e) {
    mouseX = e.clientX || e.touches[0].clientX;
    mouseY = e.clientY || e.touches[0].clientY;
}

document.addEventListener('mousemove', updateMousePosition);
document.addEventListener('touchmove', updateMousePosition, { passive: true });

// 添加触摸事件支持，为移动设备提供更好的体验
document.addEventListener('touchstart', function(e) {
    // 模拟hover效果
    const hoverElement = e.target.closest('.timer-item, .wish-card');
    if (hoverElement) {
        hoverElement.classList.add('touch-hover');
    }
});

document.addEventListener('touchend', function(e) {
    // 移除模拟的hover效果
    document.querySelectorAll('.touch-hover').forEach(el => {
        el.classList.remove('touch-hover');
    });
    
    // 添加触摸点击特效
    if (!e.target.closest('#countWishBtn')) {
        const touch = e.changedTouches[0];
        createSmallParticle(touch.clientX, touch.clientY);
    }
});

// 添加一些交互元素的悬停效果
const timerItems = document.querySelectorAll('.timer-item');
timerItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// 添加祝福卡片的悬停效果
const wishCard = document.querySelector('.wish-card');
if (wishCard) {
    wishCard.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
        this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.2)';
    });
    
    wishCard.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
        this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
    });
}

/**
 * 初始化互动按钮
 */
function initInteractionButtons() {
    // 获取按钮元素
    const changeWishBtn = document.getElementById('changeWishBtn');
    const sendWishBtn = document.getElementById('sendWishBtn');
    const shareBtn = document.getElementById('shareBtn');
    const effectBtn = document.getElementById('effectBtn');
    const confettiBtn = document.getElementById('confettiBtn');
    const countWishBtn = document.getElementById('countWishBtn');
    const leaderboardBtn = document.getElementById('leaderboardBtn');
    
    // 添加事件监听器
    changeWishBtn.addEventListener('click', changeWish);
    sendWishBtn.addEventListener('click', sendWish);
    shareBtn.addEventListener('click', sharePage);
    effectBtn.addEventListener('click', toggleEffect);
    confettiBtn.addEventListener('click', showConfetti);
    countWishBtn.addEventListener('click', countWish);
    leaderboardBtn.addEventListener('click', showLeaderboard);
    
    // 初始化祝福计数器
    updateWishCounterDisplay();
    
    // 初始化进度环
    initProgressRing();
}

/**
 * 更换祝福内容
 */
function changeWish() {
    const wishContent = document.getElementById('wishContent');
    const wishList = [
        {
            text: '愿新的一年里，<br>快乐与你同行，<br>成功与你相伴，<br>健康与你相随，<br><strong>元旦快乐！</strong>',
            title: '🌟 新年祝福 🌟'
        },
        {
            text: '新的一年，新的开始，<br>新的希望，新的梦想，<br>愿你一切顺利，<br>万事如意！<br><strong>新年快乐！</strong>',
            title: '✨ 新年寄语 ✨'
        },
        {
            text: '愿你在新的一年里，<br>事业蒸蒸日上，<br>家庭幸福美满，<br>身体健康强壮！<br><strong>元旦快乐！</strong>',
            title: '🎯 新年祈愿 🎯'
        },
        {
            text: '新的一年，<br>愿阳光温暖你的每一天，<br>幸福围绕你的每一刻，<br>快乐伴随你的每一秒！<br><strong>新年快乐！</strong>',
            title: '☀️ 新年祝福 ☀️'
        },
        {
            text: '愿你在新的一年里，<br>笑口常开，<br>好运连连，<br>财源滚滚，<br><strong>元旦快乐！</strong>',
            title: '💰 新年祝福 💰'
        },
        {
            text: '新的一年，新的起点，<br>愿你勇敢追求梦想，<br>实现心中所愿！<br><strong>新年快乐！</strong>',
            title: '🚀 新年寄语 🚀'
        }
    ];
    
    // 随机选择一个祝福
    const randomWish = wishList[Math.floor(Math.random() * wishList.length)];
    
    // 添加过渡效果
    wishContent.style.opacity = '0';
    wishContent.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        wishContent.innerHTML = randomWish.text;
        document.querySelector('.wish-title').textContent = randomWish.title;
        
        wishContent.style.opacity = '1';
        wishContent.style.transform = 'scale(1)';
        wishContent.style.transition = 'all 0.5s ease';
    }, 300);
    
    // 播放音效（可选）
    playClickSound();
}

/**
 * 发送祝福
 */
function sendWish() {
    // 简单实现：显示提示框
    alert('祝福已发送！🎉\n\n愿接收者新年快乐，万事如意！');
    
    // 更复杂的实现可以是发送邮件或短信，但需要后端支持
    // 这里我们只是模拟发送效果
    playSuccessSound();
}

/**
 * 分享网页
 */
function sharePage() {
    const shareUrl = window.location.href;
    const shareTitle = '元旦快乐 - New Year\'s Day Wishes';
    const shareText = '快来查看这个精美的元旦祝福网页！';
    
    // 检查浏览器是否支持分享API
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl
        })
        .then(() => {
            console.log('分享成功');
        })
        .catch((error) => {
            console.error('分享失败:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
    
    function fallbackShare() {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert('链接已复制到剪贴板！\n\n' + shareUrl);
        })
        .catch(() => {
            // 显示链接供用户手动复制
            prompt('请复制以下链接:', shareUrl);
        });
    }
    
    playClickSound();
}

/**
 * 切换特效
 */
function toggleEffect() {
    const body = document.body;
    const currentBackground = body.style.background;
    
    // 预定义的背景效果
    const backgrounds = [
        'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
        'linear-gradient(135deg, #ff9a9e, #fecfef, #fecfef, #fecfef)',
        'linear-gradient(135deg, #a8edea, #fed6e3, #fed6e3, #fed6e3)',
        'linear-gradient(135deg, #ffecd2, #fcb69f, #fcb69f, #fcb69f)',
        'linear-gradient(135deg, #d299c2, #fef9d7, #fef9d7, #fef9d7)',
        'linear-gradient(135deg, #fa709a, #fee140, #fee140, #fee140)'
    ];
    
    // 随机选择一个背景
    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    
    // 应用新背景
    body.style.background = randomBackground;
    
    // 添加过渡效果
    body.style.transition = 'background 1s ease-in-out';
    
    // 播放音效
    playClickSound();
    
    // 显示提示
    const effectBtn = document.getElementById('effectBtn');
    effectBtn.innerHTML = '<span class="btn-icon">🎨</span> 特效已切换';
    
    setTimeout(() => {
        effectBtn.innerHTML = '<span class="btn-icon">🎨</span> 切换特效';
    }, 1500);
}

/**
 * 显示礼花效果
 */
function showConfetti() {
    // 创建礼花容器
    let confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) {
        confettiContainer = document.createElement('div');
        confettiContainer.id = 'confetti-container';
        document.body.appendChild(confettiContainer);
    }
    
    // 创建礼花
    const confettiCount = 200;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#a29bfe'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // 随机颜色
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机大小
        const size = Math.random() * 15 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // 随机位置
        confetti.style.left = Math.random() * 100 + '%';
        
        // 随机动画持续时间
        const duration = Math.random() * 5 + 3;
        confetti.style.animationDuration = duration + 's';
        
        // 随机动画延迟
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // 随机旋转和移动
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        
        // 添加到容器
        confettiContainer.appendChild(confetti);
        
        // 动画结束后移除
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, duration * 1000);
    }
    
    // 播放音效
    playCelebrationSound();
    
    // 显示按钮反馈
    const confettiBtn = document.getElementById('confettiBtn');
    confettiBtn.innerHTML = '<span class="btn-icon">🎊</span> 礼花正在播放';
    
    setTimeout(() => {
        confettiBtn.innerHTML = '<span class="btn-icon">🎊</span> 开启礼花';
    }, 2000);
}

/**
 * 播放点击音效
 */
function playClickSound() {
    // 创建音频元素
    const audio = new Audio();
    audio.src = 'https://www.soundjay.com/buttons/sounds/button-09.mp3';
    audio.volume = 0.5;
    audio.play().catch(error => {
        console.log('音效播放失败:', error);
    });
}

/**
 * 播放成功音效
 */
function playSuccessSound() {
    const audio = new Audio();
    audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3';
    audio.volume = 0.5;
    audio.play().catch(error => {
        console.log('音效播放失败:', error);
    });
}

/**
 * 播放庆祝音效
 */
function playCelebrationSound() {
    const audio = new Audio();
    audio.src = 'https://www.soundjay.com/party/sounds/party-horn-02.mp3';
    audio.volume = 0.5;
    audio.play().catch(error => {
        console.log('音效播放失败:', error);
    });
}



/**
 * 累计祝福功能 - 高级版（带连击系统）
 */
function countWish() {
    const button = document.getElementById('countWishBtn');
    if (!button) return;
    
    const now = Date.now();
    const comboCounter = document.getElementById('comboCounter');
    
    // 检查连击
    if (now - lastWishTime < COMBO_WINDOW) {
        comboCount++;
        if (comboCount > maxCombo) {
            maxCombo = comboCount;
        }
        showComboCounter(comboCounter);
        
        // 重置连击计时器
        resetComboTimer();
        
        // 播放连击音效
        playSuccessSound();
        
        // 添加连击特效
        button.classList.add('combo-effect');
        setTimeout(() => button.classList.remove('combo-effect'), 300);
        
        // 连击时添加屏幕震动效果
        if (comboCount % 5 === 0) {
            document.body.classList.add('screen-shake');
            setTimeout(() => document.body.classList.remove('screen-shake'), 200);
        }
    } else {
        comboCount = 1;
        hideComboCounter(comboCounter);
        
        // 重置连击计时器
        resetComboTimer();
        
        // 播放普通点击音效
        playClickSound();
    }
    
    lastWishTime = now;
    
    // 计算实际增加的祝福数（考虑连击加成）
    const actualIncrease = Math.max(1, Math.floor(comboCount / 2));
    wishCount = getWishCount() + actualIncrease;
    
    // 添加3D按钮点击动画
    create3DClickEffect(button);
    
    // 生成高级粒子爆发效果
    createAdvancedParticleBurst(button, actualIncrease);
    
    // 保存计数到localStorage
    saveWishCount(wishCount);
    
    // 更新显示
    updateWishCounterDisplay();
    
    // 更新进度环
    updateProgressRing(wishCount);
    
    // 检查成就
    checkAchievements(wishCount);
    checkComboAchievements(comboCount);
    
    // 随机触发庆祝效果（每10次祝福）
    if (wishCount % 10 === 0) {
        showConfetti();
        playCelebrationSound();
        showAchievementBadge(`🎉 恭喜！您已经发送了${wishCount}次祝福！`);
    }
    
    // 为祝福计数添加弹出数字效果
    createFloatingNumber(button, `+${actualIncrease}`, comboCount > 1 ? '#ff6b6b' : '#4ecdc4');
}

/**
 * 创建浮动数字效果
 */
function createFloatingNumber(element, text, color = '#ff6b6b') {
    const floatingNumber = document.createElement('div');
    floatingNumber.className = 'floating-number';
    floatingNumber.textContent = text;
    floatingNumber.style.color = color;
    floatingNumber.style.fontWeight = 'bold';
    floatingNumber.style.fontSize = '20px';
    floatingNumber.style.position = 'fixed';
    floatingNumber.style.pointerEvents = 'none';
    floatingNumber.style.zIndex = '1001';
    floatingNumber.style.transition = 'all 1s ease-out';
    
    const rect = element.getBoundingClientRect();
    floatingNumber.style.left = `${rect.left + rect.width / 2}px`;
    floatingNumber.style.top = `${rect.top + rect.height / 2}px`;
    floatingNumber.style.transform = 'translate(-50%, -50%) scale(0)';
    
    document.body.appendChild(floatingNumber);
    
    // 触发动画
    setTimeout(() => {
        floatingNumber.style.transform = 'translate(-50%, -100px) scale(1.5)';
        floatingNumber.style.opacity = '0';
    }, 10);
    
    // 动画结束后移除
    setTimeout(() => {
        floatingNumber.remove();
    }, 1000);
}

/**
 * 显示连击计数器
 */
function showComboCounter(comboCounter) {
    if (comboCounter) {
        comboCounter.textContent = `x${comboCount}`;
        comboCounter.classList.add('show');
        comboCounter.classList.add('pulse');
        
        // 移除脉冲类以允许下次脉冲
        setTimeout(() => {
            comboCounter.classList.remove('pulse');
        }, 300);
    }
}

/**
 * 隐藏连击计数器
 */
function hideComboCounter(comboCounter) {
    if (comboCounter) {
        comboCounter.classList.remove('show');
    }
}

/**
 * 重置连击计时器
 */
function resetComboTimer() {
    if (comboTimer) {
        clearTimeout(comboTimer);
    }
    
    comboTimer = setTimeout(() => {
        comboCount = 1;
        hideComboCounter(document.getElementById('comboCounter'));
    }, COMBO_WINDOW);
}

/**
 * 3D点击效果
 */
function create3DClickEffect(button) {
    button.style.transform = 'scale(0.95) rotateX(-5deg) rotateY(-5deg)';
    setTimeout(() => {
        button.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    }, 150);
}

/**
 * 检查连击成就
 */
function checkComboAchievements(combo) {
    const comboAchievements = {
        5: { name: '连击达人', description: '达成5连击', icon: '⚡' },
        10: { name: '连击大师', description: '达成10连击', icon: '🔥' },
        20: { name: '连击之神', description: '达成20连击', icon: '💥' }
    };
    
    if (comboAchievements[combo]) {
        const achievement = comboAchievements[combo];
        showAchievementBadge(`${achievement.icon} ${achievement.name}: ${achievement.description}`);
    }
}

/**
 * 粒子对象池管理
 */
class ParticlePool {
    constructor(container, maxSize = 100) {
        this.container = container;
        this.maxSize = maxSize;
        this.pool = [];
        this.colors = ['#ff6b6b', '#fd79a8', '#a29bfe', '#6c5ce7', '#00b894', '#00cec9', '#ffeaa7'];
    }
    
    // 获取粒子（从池或创建新的）
    getParticle() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        
        // 如果池已满，返回null
        if (this.container.children.length >= this.maxSize) {
            return null;
        }
        
        // 创建新粒子
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        this.container.appendChild(particle);
        return particle;
    }
    
    // 释放粒子回池
    releaseParticle(particle) {
        particle.style.transform = 'translate(0, 0) scale(1)';
        particle.style.opacity = '1';
        particle.style.display = 'none';
        this.pool.push(particle);
    }
    
    // 重置池
    reset() {
        this.pool.forEach(particle => particle.remove());
        this.pool = [];
    }
}

// 创建粒子池实例

// --------------------------
// 初始化函数
// --------------------------

// 主初始化函数
document.addEventListener('DOMContentLoaded', function() {
    // 初始化倒计时
    initCountdown();
    
    // 初始化雪花效果
    initSnow();
    
    // 初始化音乐控制
    initMusicControl();
    
    // 初始化交互按钮
    initInteractionButtons();
    
    // 初始化进度环
    initProgressRing();
    
    // 初始化粒子池，根据屏幕尺寸调整大小
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        // 在移动设备上减少粒子池大小以提高性能
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        const maxParticles = screenWidth < 768 ? 80 : 150;
        particlePool = new ParticlePool(particlesContainer, maxParticles);
    }
    
    // 初始化动态背景
    initDynamicBackground();
    
    // 添加点击特效到整个页面
    document.addEventListener('click', function(e) {
        // 避免与祝福按钮冲突
        if (!e.target.closest('#countWishBtn')) {
            createSmallParticle(e.clientX, e.clientY);
        }
    });
    
    // 加载并更新祝福计数显示
    wishCount = getWishCount();
    updateWishCounterDisplay();
    
    // 初始化自定义指针
    initCustomCursor();
});

// 初始化自定义指针
function initCustomCursor() {
    // 创建自定义指针元素
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // 添加福字
    const fuChar = document.createElement('span');
    fuChar.textContent = '福';
    cursor.appendChild(fuChar);
    
    document.body.appendChild(cursor);
    
    // 指针移动事件
    function updateCursorPosition(e) {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }
    
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('touchmove', updateCursorPosition, { passive: true });
    
    // 点击效果
    function addClickEffect() {
        cursor.classList.add('click');
        setTimeout(() => {
            cursor.classList.remove('click');
        }, 150);
    }
    
    document.addEventListener('click', addClickEffect);
    document.addEventListener('touchstart', addClickEffect);
    
    // 悬停效果
    const interactiveElements = ['button', '.timer-item', '.wish-card', '.music-control'];
    
    interactiveElements.forEach(selector => {
        document.addEventListener('mouseover', function(e) {
            if (e.target.matches(selector) || e.target.closest(selector)) {
                cursor.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            if (e.target.matches(selector) || e.target.closest(selector)) {
                cursor.classList.remove('hover');
            }
        });
    });
    
    // 鼠标移出窗口时隐藏指针
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // 鼠标移入窗口时显示指针
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
}

/**
 * 高级粒子爆发效果（优化版）
 */
function createAdvancedParticleBurst(button, intensity) {
    if (!particlePool) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 根据连击强度确定粒子数量
    const particleCount = Math.min(50, 10 + intensity * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = particlePool.getParticle();
        if (!particle) continue;
        
        // 随机颜色
        particle.style.backgroundColor = particlePool.colors[Math.floor(Math.random() * particlePool.colors.length)];
        
        // 随机大小
        const size = Math.random() * 6 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 设置初始位置
        particle.style.left = `${centerX - size/2}px`;
        particle.style.top = `${centerY - size/2}px`;
        particle.style.display = 'block';
        
        // 随机速度和方向
        const angle = (Math.PI * 2 * Math.random());
        const speed = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // 应用动画
        const duration = Math.random() * 1 + 0.5;
        particle.style.transition = `all ${duration}s ease-out`;
        
        // 触发动画
        setTimeout(() => {
            particle.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
            particle.style.opacity = '0';
        }, 10);
        
        // 动画结束后回收
        setTimeout(() => {
            particlePool.releaseParticle(particle);
        }, duration * 1000 + 50);
    }
}

/**
 * 从localStorage获取祝福计数
 */
function getWishCount() {
    const count = localStorage.getItem('wishCount');
    return count ? parseInt(count) : 0;
}

/**
 * 将祝福计数保存到localStorage
 */
function saveWishCount(count) {
    localStorage.setItem('wishCount', count.toString());
}

/**
 * 更新祝福计数器显示
 */
function updateWishCounterDisplay() {
    const count = getWishCount();
    const wishCounter = document.getElementById('wishCounter');
    if (wishCounter) {
        // 数字动画效果
        animateNumber(wishCounter, parseInt(wishCounter.textContent) || 0, count, 500);
    }
}

/**
 * 数字动画效果
 */
function animateNumber(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * 创建粒子爆发效果
 */
function createParticleBurst(button) {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // 创建20个粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机颜色
        const colors = ['#ff6b6b', '#fd79a8', '#a29bfe', '#6c5ce7', '#00b894', '#00cec9'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机位置（围绕按钮中心）
        const angle = (Math.PI * 2 * i) / 20;
        const radius = Math.random() * 30 + 20;
        particle.style.left = `${centerX + Math.cos(angle) * radius}px`;
        particle.style.top = `${centerY + Math.sin(angle) * radius}px`;
        
        // 随机大小
        const size = Math.random() * 4 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机动画延迟和持续时间
        particle.style.animationDelay = `${Math.random() * 0.3}s`;
        particle.style.animationDuration = `${Math.random() * 0.5 + 0.8}s`;
        
        // 随机动画路径
        particle.style.animationName = 'particle-animation';
        
        particlesContainer.appendChild(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

/**
 * 初始化进度环
 */
function initProgressRing() {
    const countWishBtn = document.getElementById('countWishBtn');
    if (!countWishBtn) return;
    
    // 创建进度环容器
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    // 创建SVG进度环
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.className = 'progress-ring';
    svg.setAttribute('width', '50');
    svg.setAttribute('height', '50');
    
    // 创建背景圆环
    const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    backgroundCircle.setAttribute('cx', '25');
    backgroundCircle.setAttribute('cy', '25');
    backgroundCircle.setAttribute('r', '18');
    backgroundCircle.setAttribute('fill', 'none');
    backgroundCircle.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
    backgroundCircle.setAttribute('stroke-width', '4');
    
    // 创建进度圆环
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    progressCircle.setAttribute('id', 'progressCircle');
    progressCircle.setAttribute('cx', '25');
    progressCircle.setAttribute('cy', '25');
    progressCircle.setAttribute('r', '18');
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
    progressCircle.setAttribute('stroke-width', '4');
    progressCircle.setAttribute('stroke-dasharray', '113');
    progressCircle.setAttribute('stroke-dashoffset', '113');
    progressCircle.setAttribute('stroke-linecap', 'round');
    
    // 组合元素
    svg.appendChild(backgroundCircle);
    svg.appendChild(progressCircle);
    progressContainer.appendChild(svg);
    countWishBtn.appendChild(progressContainer);
    
    // 更新初始进度
    const currentCount = getWishCount();
    updateProgressRing(currentCount);
}

/**
 * 更新进度环
 */
function updateProgressRing(count) {
    const progressCircle = document.getElementById('progressCircle');
    if (!progressCircle) {
        // 如果进度环不存在，先初始化
        initProgressRing();
        return;
    }
    
    // 每10次祝福为一个周期
    const cycleCount = 10;
    const progress = (count % cycleCount) / cycleCount;
    const circumference = 2 * Math.PI * 18; // 2πr
    const offset = circumference - (progress * circumference);
    
    progressCircle.style.strokeDashoffset = offset;
}

/**
 * 成就系统
 */
const achievements = {
    1: { name: '初心者', description: '发送第一次祝福', icon: '🌟' },
    10: { name: '祝福使者', description: '发送10次祝福', icon: '💫' },
    25: { name: '祝福达人', description: '发送25次祝福', icon: '✨' },
    50: { name: '祝福大师', description: '发送50次祝福', icon: '🎖️' },
    100: { name: '祝福之神', description: '发送100次祝福', icon: '👑' }
};

/**
 * 检查成就
 */
function checkAchievements(count) {
    if (achievements[count]) {
        const achievement = achievements[count];
        showAchievementBadge(`${achievement.icon} ${achievement.name}: ${achievement.description}`);
        
        // 保存已获得的成就
        saveAchievement(achievement.name);
    }
}

/**
 * 保存成就
 */
function saveAchievement(achievementName) {
    let achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    if (!achievements.includes(achievementName)) {
        achievements.push(achievementName);
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }
}

/**
 * 显示成就徽章
 */
function showAchievementBadge(message) {
    // 移除已存在的徽章
    const existingBadge = document.querySelector('.achievement-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // 创建新徽章
    const badge = document.createElement('div');
    badge.className = 'achievement-badge';
    badge.innerHTML = `<span class="achievement-icon">🎊</span>${message}`;
    
    document.body.appendChild(badge);
    
    // 显示徽章
    setTimeout(() => {
        badge.classList.add('show');
    }, 100);
    
    // 3秒后隐藏徽章
    setTimeout(() => {
        badge.classList.remove('show');
        setTimeout(() => {
            badge.remove();
        }, 500);
    }, 3000);
}

// 排行榜功能
/**
 * 加载排行榜
 */
function loadLeaderboard() {
    const saved = localStorage.getItem('leaderboard');
    return saved ? JSON.parse(saved) : [];
}

/**
 * 保存排行榜
 */
function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

/**
 * 更新排行榜
 */
function updateLeaderboard() {
    let leaderboard = loadLeaderboard();
    
    // 添加当前用户到排行榜（使用随机用户名）
    const username = `用户${Math.floor(Math.random() * 10000)}`;
    leaderboard.push({ 
        username, 
        count: getWishCount(), 
        date: new Date().toISOString() 
    });
    
    // 按祝福数排序并只保留前10名
    leaderboard.sort((a, b) => b.count - a.count);
    leaderboard = leaderboard.slice(0, 10);
    
    saveLeaderboard(leaderboard);
}

/**
 * 显示排行榜
 */
function showLeaderboard() {
    // 创建排行榜元素（如果不存在）
    let leaderboardContainer = document.getElementById('leaderboardContainer');
    if (!leaderboardContainer) {
        leaderboardContainer = document.createElement('div');
        leaderboardContainer.id = 'leaderboardContainer';
        leaderboardContainer.className = 'leaderboard-container';
        leaderboardContainer.innerHTML = `
            <h3 class="leaderboard-title">🎉 祝福排行榜 🎉</h3>
            <ul class="leaderboard-list" id="leaderboardList"></ul>
        `;
        document.body.appendChild(leaderboardContainer);
        
        // 点击外部关闭排行榜
        leaderboardContainer.addEventListener('click', (e) => {
            if (e.target === leaderboardContainer) {
                hideLeaderboard();
            }
        });
    }
    
    // 更新排行榜内容
    const leaderboardList = leaderboardContainer.querySelector('#leaderboardList');
    const leaderboardData = loadLeaderboard();
    
    leaderboardList.innerHTML = '';
    leaderboardData.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'leaderboard-item';
        listItem.innerHTML = `
            <span class="leaderboard-rank">${index + 1}</span>
            <span>${entry.username}</span>
            <span>${entry.count}</span>
        `;
        leaderboardList.appendChild(listItem);
    });
    
    // 显示排行榜
    leaderboardContainer.classList.add('show');
}

/**
 * 隐藏排行榜
 */
function hideLeaderboard() {
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    if (leaderboardContainer) {
        leaderboardContainer.classList.remove('show');
    }
}

// 动态背景效果
/**
 * 初始化动态背景
 */
function initDynamicBackground() {
    const container = document.querySelector('.container');
    if (!container) return;
    
    // 添加动态背景渐变
    container.style.background = 'linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #e94560)';
    container.style.backgroundSize = '400% 400%';
    container.style.animation = 'gradientShift 15s ease infinite';
}

// 初始化所有高级功能


/**
 * 创建小型粒子效果
 */
function createSmallParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = '#ff6b6b';
    particle.style.width = '4px';
    particle.style.height = '4px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`;
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 500);
}

// 更新saveWishCount函数以包含排行榜更新
const originalSaveWishCount = saveWishCount;
saveWishCount = function(count) {
    originalSaveWishCount(count);
    updateLeaderboard();
};
