const VIEWPORT_WIDTH = {
  Aveda: { PC: 1200, Mobile: 750 },
  Mac: { PC: 1280, Mobile: 750 },
};

let brand = 'Aveda';
let deviceType = 'PC';

// 브랜드 테마 컬러 설정
const setBrandColor = (brandName) => {
  const colors = {
    Aveda: {
      main: 'rgb(85, 130, 10)',
      secondary: 'rgb(160, 210, 80)',
      bg: 'rgb(240, 245, 235)',
    },
    Mac: {
      main: 'rgb(126, 34, 206)',
      secondary: 'rgb(216 180 254)',
      bg: 'rgb(250, 245, 255)',
    },
  };

  const { main, secondary, bg } = colors[brandName];

  document.documentElement.style.setProperty('--main-color', main);
  document.documentElement.style.setProperty('--secondary-color', secondary);
  document.documentElement.style.setProperty('--bg-color', bg);
};

// 탭 버튼 활성화
const activateTabButton = (brandName) => {
  const brandButtons = document.querySelectorAll('.container .tabs button');

  brandButtons.forEach((btn) => {
    btn.classList.remove('active');

    if (btn.getAttribute('data-brand') === brandName) {
      const test = btn.getAttribute('data-brand');
      btn.classList.add('active');
    }
  });
};

// 뷰포트 너비 업데이트
const updateViewportWidth = () => {
  const viewportWidth = document.querySelector('.content .viewport-width .text');
  viewportWidth.innerHTML = VIEWPORT_WIDTH[brand][deviceType];
};

// px을 vw로 변환
const convertPxToVw = () => {
  const pxInput = document.querySelector('.content .input-area .input-box');
  const pxValue = parseFloat(pxInput.value);

  const baseWidth = VIEWPORT_WIDTH[brand][deviceType];
  const result = document.querySelector('.content .result span');

  if (isNaN(pxValue)) return;

  if (brand === 'Aveda') {
    const multiplier = 100;
    const vwValue = ((pxValue / baseWidth) * multiplier).toFixed(2);
    result.innerHTML = `clamp(0px, ${vwValue}vw, ${pxValue}px)`;
  } else {
    const multiplier = deviceType === 'PC' ? 0.1 : 0.01;
    const vwValue = ((pxValue * 2) / (baseWidth * multiplier)).toFixed(2);
    result.innerHTML = `clamp(${pxValue}px, ${vwValue}vw, ${pxValue * 2}px)`;
  }

  showResult();
  copyText(result.innerHTML);
};

const selectBrand = (selectedBrand) => {
  brand = selectedBrand;
  setBrandColor(brand);
  activateTabButton(brand);
  updateViewportWidth();
  reset();
};

const selectDeviceType = (selectedType) => {
  deviceType = selectedType;
  updateViewportWidth();
  reset();
};

// 결과 영역 active
const showResult = () => {
  const resultWrap = document.querySelector('.content .result-wrap');
  resultWrap.classList.add('active');
};

// 	텍스트 복사
const copyText = (result) => {
  const copyButton = document.querySelector('.content .result-wrap .copy-btn');

  copyButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(result);
    copyButton.classList.add('ani');
    setTimeout(() => {
      copyButton.classList.remove('ani');
    }, 500);
  });
};

// 초기화
const reset = () => {
  const pxInput = document.querySelector('.content .input-area .input-box');
  pxInput.value = '';
  const result = document.querySelector('.content .result span');
  result.innerHTML = '';
  const resultWrap = document.querySelector('.content .result-wrap');
  resultWrap.classList.remove('active');
};
