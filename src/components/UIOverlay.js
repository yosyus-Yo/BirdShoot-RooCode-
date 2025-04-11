import React from 'react';

function UIOverlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* TODO: 점수판, 메뉴 버튼 등 UI 요소 구현 */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'black', fontSize: '20px' }}>
        Score: 0
      </div>
      {/* 추가 UI 요소 */}
    </div>
  );
}

export default UIOverlay;