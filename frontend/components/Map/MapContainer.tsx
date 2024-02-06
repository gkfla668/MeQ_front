import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Link from "next/link";
import MarkerSVG from "public/assets/marker.svg";

interface Props {
  restaurantsId: number;
  restaurantsName: string;
  restaurantsNumber: string;
  restaurantsAddress: string;
  restaurantsLongitude: string;
  restaurantsLatitude: string;
  restaurantsUrl: string;
  restaurantsCategory: string;
}

interface MapContainerProps {
  recommendedList: Props[];
}

const Marker = styled(Link)`
  background-color: white;
  border: 2px solid #ff7f00;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;

  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 1.05;
  }
`;

const MapContainer = ({ recommendedList }: MapContainerProps) => {
  return (
    <>
      <Map
        center={{ lat: 37.2822024, lng: 127.0463244 }}
        style={{
          width: "800px",
          height: "500px",
          borderRadius: "20px",
          border: "2px solid #FF7F00",
          zIndex: "0",
        }}
        level={3}
      >
        <MapMarker
          position={{ lat: 37.2822024, lng: 127.0463244 }}
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: { width: 24, height: 34 },
          }}
        />
        {Array.isArray(recommendedList) &&
          recommendedList.map((item: Props, index: number) => {
            return (
              <CustomOverlayMap
                key={index}
                position={{
                  lat: Number(item.restaurantsLatitude),
                  lng: Number(item.restaurantsLongitude),
                }}
              >
                <Marker href={`${item.restaurantsUrl}`}>
                  <MarkerSVG />
                  {item.restaurantsName}
                </Marker>
              </CustomOverlayMap>
            );
          })}
      </Map>
    </>
  );
};

export default MapContainer;
