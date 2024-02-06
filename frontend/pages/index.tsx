import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import MapContainer from "@/components/Map/MapContainer";

import SearchSVG from "public/assets/search.svg";
import GoodSVG from "public/assets/good.svg";

import OnSVG from "public/assets/on.svg";
import OffSVG from "public/assets/off.svg";

/** dummyImg */
import Img1 from "public/imgs/카레비프스튜.jpg";
import Img2 from "public/imgs/케밥.jpg";
import Img3 from "public/imgs/토마토파스타.jpg";
import Img4 from "public/imgs/콩나물볶음.jpg";
import Img5 from "public/imgs/감자그라탕.jpg";
import Img6 from "public/imgs/콩나물불고기.jpg";

import { API } from "./api/api";
import RestaurantItem from "@/components/RestaurantItem";
import { selectedFirstGroup, selectedSecondGroup } from "@/recoil/states";
import { useRecoilState } from "recoil";

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

export default function Home() {
  const [recommendedList, setRecommendedList] = useState<Props[]>([]);
  const checkedAllergies = useRecoilState(selectedFirstGroup);
  const checkedFoods = useRecoilState(selectedSecondGroup);
  console.log(checkedAllergies, checkedFoods);

  const [membersKey, setMembersKey] = useState<string | null>();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setMembersKey(localStorage.getItem("membersKey"));
  }, [membersKey, checkedAllergies, checkedFoods]);

  useEffect(() => {
    if (membersKey) {
      API.get(`/api/v1/restaurants/${membersKey}`)
        .then(res => {
          console.log(res.data.responseData.responseDtoList);
          setRecommendedList(res.data.responseData.responseDtoList);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [membersKey]);

  const handleRouter = () => {
    if (
      membersKey &&
      checkedAllergies[0].length == 0 &&
      checkedFoods[0].length == 0
    )
      return router.push("/myAllergy");

    if (!membersKey) return router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center w-[80rem]">
      <div className="relative w-full flex flex-col gap-4 justify-center items-start ">
        <div className="flex gap-6 items-center mb-[18rem] w-[80rem]">
          <GoodSVG />
          <p className="font-bold text-[1.6rem] whitespace-nowrap">
            오늘의 맞춤메뉴를 추천해요!
          </p>
        </div>
        <div className="absolute left-1/2 top-48 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center ">
          {membersKey &&
          checkedAllergies[0].length > 0 &&
          checkedFoods[0].length > 0 ? (
            <ul className="max-w-[130rem] w-full flex gap-6 overflow-x-auto whitespace-nowrap ">
              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img1}
                  alt="카레비프스튜"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem]"></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  카레비프스튜
                </div>
              </li>

              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img2}
                  alt="케밥"
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                />
                <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem] "></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  케밥
                </div>
              </li>
              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img3}
                  alt="토마토파스타"
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                />
                <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem]"></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  토마토파스타
                </div>
              </li>
              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img4}
                  alt="콩나물볶음"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem] "></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  콩나물볶음
                </div>
              </li>
              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img5}
                  alt="감자치즈그라탕"
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                />
                <div className="absolute bottom-0 w-[100%] opacity-50 bg-[#423227] h-[3.6rem]"></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  감자치즈그라탕
                </div>
              </li>

              <li className="relative inline-block min-w-[20rem]">
                <Image
                  src={Img6}
                  alt="콩나물불고기"
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1.6rem",
                  }}
                />
                <div className="absolute bottom-0 w-[100%] opacity-50 bg-[#423227] h-[3.6rem]"></div>
                <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                  콩나물불고기
                </div>
              </li>
            </ul>
          ) : (
            <div className="relative cursor-pointer" onClick={handleRouter}>
              <div className="flex gap-4 justify-center items-center absolute left-1/3 top-1/3">
                <div className="z-10 bg-[#ff7f00] rounded-[2rem] inline py-2 px-5 text-white text-[1.4rem] font-bold">
                  맞춤 필터
                </div>
                <div className="text-[1.6rem] font-bold text-[#423227]">
                  등록하고 건강하고 안전한 음식 추천을 받아보세요!
                </div>
              </div>
              <ul className=" opacity-[0.2] max-w-[130rem] w-full flex gap-6 overflow-x-auto whitespace-nowrap ">
                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img1}
                    alt="카레비프스튜"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem]"></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    카레비프스튜
                  </div>
                </li>

                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img2}
                    alt="케밥"
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem] "></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    케밥
                  </div>
                </li>
                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img3}
                    alt="토마토파스타"
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem]"></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    토마토파스타
                  </div>
                </li>
                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img4}
                    alt="콩나물볶음"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-[100%]  opacity-50 bg-[#423227] h-[3.6rem] "></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    콩나물볶음
                  </div>
                </li>
                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img5}
                    alt="감자치즈그라탕"
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="absolute bottom-0 w-[100%] opacity-50 bg-[#423227] h-[3.6rem]"></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    감자치즈그라탕
                  </div>
                </li>

                <li className="relative inline-block min-w-[20rem]">
                  <Image
                    src={Img6}
                    alt="콩나물불고기"
                    className="object-cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <div className="absolute bottom-0 w-[100%] opacity-50 bg-[#423227] h-[3.6rem]"></div>
                  <div className="absolute bottom-5 left-5 text-white font-bold text-[1.2rem]">
                    콩나물불고기
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-start">
        <div className="flex gap-6 justify-start items-center">
          <SearchSVG />
          <p className="font-bold text-[1.6rem] whitespace-nowrap">
            내 주변, 안전한 맛집을 찾아보세요!
          </p>
        </div>
        <div className="flex relative">
          {isOpen ? (
            <div className="bg-white flex flex-col gap-6 absolute left-0 top-0 z-10 py-8 px-3 border-[2px] w-[280px] h-full border-[#FF7F00] rounded-[20px]">
              <div className="flex flex-col gap-5 overflow-y-auto px-5 scrollbar-hide">
                {recommendedList.map((item, index) => {
                  return <RestaurantItem item={item} index={index} />;
                })}
              </div>
              <div
                className="absolute top-1/2 -right-5 cursor-pointer"
                onClick={() => setIsOpen(() => false)}
              >
                <OffSVG />
              </div>
            </div>
          ) : (
            <div
              className="absolute top-1/2 -left-5 z-10 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <OnSVG />
            </div>
          )}

          <MapContainer recommendedList={recommendedList} />
        </div>
      </div>
    </div>
  );
}
