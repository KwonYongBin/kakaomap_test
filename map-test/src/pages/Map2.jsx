import React, { useEffect, useRef, useState } from 'react';

// 카카오맵 SDK 로딩 및 초기화를 위한 단일 React 컴포넌트
const KAKAO_APP_KEY = "ba6d5501eeb4a5d8098250cf5972fc00"; // <<--- 발급받은 실제 APP KEY를 여기에 넣어주세요.

const Map2 = () => {
  // 지도를 렌더링할 DOM 요소를 참조하기 위한 Ref
  const mapRef = useRef(null);
  // 스크립트 로딩 상태 관리
  const [isMapReady, setIsMapReady] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    // 1. 카카오맵 SDK가 이미 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      setIsMapReady(true);
      return;
    }

    // 2. 카카오맵 SDK 로드 스크립트 동적 생성
    const scriptId = 'kakao-map-sdk';
    if (document.getElementById(scriptId)) {
        // 이미 스크립트 추가 시도 중
        return;
    }

    // 앱 키가 설정되지 않은 경우 오류 처리
    if (KAKAO_APP_KEY === "YOUR_KAKAO_APP_KEY" || !KAKAO_APP_KEY) {
        setLoadingError("카카오맵 APP KEY를 설정해주세요. 'YOUR_KAKAO_APP_KEY'를 실제 키로 변경해야 합니다.");
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    // autoload=false를 사용하여 맵 라이브러리 로드가 완료된 후 kakao.maps.load 콜백을 사용하도록 설정
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.async = true;

    // 스크립트 로드 성공 시
    script.onload = () => {
      // 라이브러리 로드가 완료되면 맵 관련 객체 사용 준비
      window.kakao.maps.load(() => {
        setIsMapReady(true);
      });
    };

    // 스크립트 로드 실패 시
    script.onerror = () => {
      setLoadingError("카카오맵 SDK 로드에 실패했습니다. APP KEY 또는 네트워크 연결을 확인해주세요.");
    };

    // <head> 태그에 스크립트 추가
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거 (선택적)
    // return () => {
    //   document.head.removeChild(script);
    // };
  }, [mapRef]); // mapRef는 변하지 않지만, 의존성 배열에 넣어두는 것은 무방

  // 3. 맵 초기화 로직 (SDK 로드가 완료된 후에만 실행)
  useEffect(() => {
    if (isMapReady && mapRef.current) {
      try {
        // 기존 JS 로직 반영: 지도 중심 좌표 및 레벨 설정
        const options = {
          // 제주 카카오 본사 위치 (33.450701, 126.570667)
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3 // 지도의 레벨(확대, 축소 정도)
        };

        // 지도 생성
        new window.kakao.maps.Map(mapRef.current, options);
        console.log("카카오맵이 성공적으로 초기화되었습니다.");

      } catch (e) {
        setLoadingError("카카오맵 초기화 중 오류가 발생했습니다. 라이브러리 상태를 확인해주세요.");
        console.error("Kakao Map initialization error:", e);
      }
    }
  }, [isMapReady]);

  // UI 렌더링
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4"
            style={{margin:"200px 0"}}
      >
        <h1>HTML + JavaScript로직</h1>
        <h1>React 로직으로 변경</h1>

        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <hr />
        <div 
          ref={mapRef} 
          // Tailwind CSS를 사용하여 반응형 크기 및 높이 설정
          className="w-full h-[500px] border border-gray-200" 
          style={{width:"500px", height: '500px', margin:"0 auto"}} 
          id="map-container"
        >
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Map2;