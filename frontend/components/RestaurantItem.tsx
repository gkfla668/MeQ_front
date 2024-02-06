import Link from "next/link";
import styled from "styled-components";
import PhoneSVG from "public/assets/phone.svg";
import AddressSVG from "public/assets/address.svg";

import StarOff from "public/assets/star_off.svg";
import StarOn from "public/assets/star_on.svg";
import { useEffect, useState } from "react";
import { API } from "@/pages/api/api";

interface restaurantType {
  restaurantsId: number;
  restaurantsName: string;
  restaurantsNumber: string;
  restaurantsAddress: string;
  restaurantsLongitude: string;
  restaurantsLatitude: string;
  restaurantsUrl: string;
  restaurantsCategory: string;
}

interface Props {
  item: restaurantType;
  index: number;
}

const Item = styled.div`
  position: relative;
  padding: 1.2rem 1.6rem;
  border-radius: 20px;
  border: 2px solid #ff7f00;
  box-shadow: 3px 4px 14px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const RestaurantItem = (props: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [membersKey, setMembersKey] = useState<string | null>();

  useEffect(() => {
    setMembersKey(localStorage.getItem("membersKey"));
  }, [membersKey]);

  const onClick = async () => {
    setIsChecked(!isChecked);

    const data = {
      membersKey: membersKey,
      restaurantsId: props.item.restaurantsId,
    };

    if (!isChecked) {
      console.log("찜!", props.item.restaurantsId);

      try {
        const response = await API.post("/api/v1/likes", JSON.stringify(data));
        if (response.status === 200) {
        } else {
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    } else {
    }
  };

  return (
    <>
      <Item key={props.index}>
        <Link href={`${props.item.restaurantsUrl}`}>
          <div className="flex gap-2 items-end">
            <div className="text-[1.3rem] font-bold whitespace-nowrap">
              {props.item.restaurantsName}
            </div>
            <div className=" text-[#b1afae] text-[0.9rem] whitespace-nowrap">
              {props.item.restaurantsCategory}
            </div>
          </div>
          <div className="flex gap-4  items-center">
            <PhoneSVG />
            <div>{props.item.restaurantsNumber}</div>
          </div>
        </Link>
        <div className="flex gap-3 items-center">
          <AddressSVG />
          <div>{props.item.restaurantsAddress}</div>
        </div>
        {isChecked ? (
          <div className="absolute right-8 cursor-pointer" onClick={onClick}>
            <StarOn />
          </div>
        ) : (
          <div className="absolute right-8 cursor-pointer" onClick={onClick}>
            <StarOff />
          </div>
        )}
      </Item>
    </>
  );
};

export default RestaurantItem;
