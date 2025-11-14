import { Map } from "react-kakao-maps-sdk"
import useKakaoLoader from "../useKakaoLoader"

export default function BasicMap() {
  useKakaoLoader()

  return (
    <>
    <h1>React Kakao Maps SDK</h1>
    <Map // 지도를 표시할 Container
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "50%",
        height: "500px",
        margin: "200px auto"
      }}
      level={3} // 지도의 확대 레벨
      />
    </>
  )
}
