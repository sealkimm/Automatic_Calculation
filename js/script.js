const VIEWPORT_WIDTH = {
  Aveda: { PC: 1200, Wide_PC: 2880, Mobile: 750 },
  Mac: { PC: 1280, Mobile: 750 },
};

let brand = 'Aveda';
let deviceType = 'PC';

const pxInput = document.querySelector('.content .input-area .input-box');

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

  Object.entries(colors[brandName]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}-color`, value);
  });
};

// 탭 버튼 활성화
const activateTabButton = (brandName) => {
  const brandButtons = document.querySelectorAll('.container .tabs button');

  brandButtons.forEach((btn) => {
    btn.classList.remove('active');

    if (btn.getAttribute('data-brand') === brandName) {
      btn.classList.add('active');
    }
  });
};

// 뷰포트 너비 업데이트
const updateViewportWidth = () => {
  const viewportWidth = document.querySelector('.content .viewport-width .text');
  viewportWidth.innerHTML = VIEWPORT_WIDTH[brand][deviceType];
};

// deviceType PC로 초기화
const initializeDeviceType = () => {
  const pcDeviceRadio = document.querySelector('input[name="device"][value="PC"]');
  pcDeviceRadio.checked = true;
};

// px을 vw로 변환
const convertPxToVw = () => {
  const pxValue = parseFloat(pxInput.value);

  const baseWidth = VIEWPORT_WIDTH[brand][deviceType];
  const result = document.querySelector('.content .result span');

  if (isNaN(pxValue)) return;

  if (brand === 'Aveda') {
    const multiplier = 100;
    const vwValue = ((pxValue / baseWidth) * multiplier).toFixed(2);
    result.innerHTML = `clamp(0px, ${vwValue}vw, ${pxValue}px)`;
    if (deviceType === 'Wide_PC') {
      result.innerHTML = ` ${vwValue}vw`;
    }
  } else {
    const multiplier = deviceType === 'PC' ? 0.1 : 0.01;
    const vwValue = ((pxValue * 2) / (baseWidth * multiplier)).toFixed(2);
    result.innerHTML = `clamp(${pxValue}px, ${vwValue}vw, ${pxValue * 2}px)`;
  }

  showResult();
  copyText(result.innerHTML);
};

const toggleWidePCRadio = () => {
  const widePcRadio = document.querySelector('.device-area .wide');

  if (brand === 'Aveda') {
    widePcRadio.style.display = 'block';
  } else {
    widePcRadio.style.display = 'none';
  }
};

const selectBrand = (selectedBrand) => {
  brand = selectedBrand;
  deviceType = 'PC';
  setBrandColor(brand);
  activateTabButton(brand);
  toggleWidePCRadio(brand);
  updateViewportWidth();
  initializeDeviceType();
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
  pxInput.value = '';
  const result = document.querySelector('.content .result span');
  result.innerHTML = '';
  const resultWrap = document.querySelector('.content .result-wrap');
  resultWrap.classList.remove('active');
};

// Enter키 입력 시 계산 진행
pxInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') convertPxToVw();
});

// input 클릭 시 초기화
pxInput.addEventListener('click', () => {
  pxInput.value = '';
});
