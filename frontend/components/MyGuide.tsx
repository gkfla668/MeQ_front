import styled from "styled-components";

import CheckSVG from "public/assets/check.svg";
import NoticeSVG from "public/assets/notice.svg";
import { selectedFirstGroup, selectedSecondGroup } from "@/recoil/states";
import { useRecoilValue } from "recoil";

import { allergenFoods } from "@/data/AllergenFoods";
import { favoriteFoods } from "@/data/FavoriteFoods";

const Wrapper = styled.div`
  width: 100%;
  border-radius: 15px;
  border: 2px solid #f7f7f7;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 10px 20px 0px rgba(0, 0, 0, 0.05);

  padding: 2.2rem 2rem;
`;

const Item = styled.div`
  border: 2px solid #ff7f00;
  border-radius: 2rem;

  font-size: 1.3rem;
  font-weight: 800;
`;

interface OneGroupType {
  [key: string]: string;
}

const oneGroup: OneGroupType = {
  우유: "두유",
  메밀: "쌀, 감자",
  땅콩: "깨",
  밀: "쌀, 감자",
  생선: "쇠고기, 닭고기, 돼지고기, 두부, 계란",
  게: "쇠고기, 닭고기, 돼지고기, 두부, 계란",
  새우: "쇠고기, 닭고기, 돼지고기, 두부, 계란",
  돼지고기: "쇠고기, 닭고기, 생선류, 두부, 계란",
  복숭아: "수박, 참외",
};

const twoGroup: OneGroupType = {
  호두: "캐슈넛, 헤이즐넛, 브라질너트",
  새우: "게, 랍스터, 바닷가재",
  복숭아: "사과, 자두, 체리, 배, 살구, 아몬드",
  우유: "육류, 염소젖, 산양유",
  땅콩: "완두콩, 렌즈콩, 대두",
  밀: "호밀, 보리",
};

const MyGuide = () => {
  const firstGroup = useRecoilValue(selectedFirstGroup);
  const secondGroup = useRecoilValue(selectedSecondGroup);

  return (
    <div className="flex flex-col gap-12 mt-12 justify-center items-start w-full">
      <div className="flex flex-col gap-8  items-start pb-12 w-full">
        <div className="font-bold text-[1.6rem] flex gap-4">
          <CheckSVG />
          <div>알레르기 유발 대체 식품</div>
        </div>
        <Wrapper>
          <ul className="flex gap-6 overflow-x-auto scrollbar-hide">
            {firstGroup.map((item, index) => {
              if (oneGroup[allergenFoods[Number(item) - 1]] !== undefined) {
                return (
                  <Item key={index} className="flex relative">
                    <div className="text-[#ff7f00] rounded-l-[2rem] py-[1rem] px-[2rem] whitespace-nowrap">
                      {allergenFoods[Number(item) - 1]}
                    </div>
                    <div className="bg-[#ff7f00] text-white rounded-r-[2rem] py-[1rem] px-[2rem] whitespace-nowrap">
                      {oneGroup[allergenFoods[Number(item) - 1]]}
                    </div>
                  </Item>
                );
              }
              return null;
            })}
          </ul>
        </Wrapper>
      </div>
      <div className="flex flex-col gap-8 items-start w-full">
        <div className="font-bold text-[1.6rem] flex justify-start gap-4">
          <NoticeSVG />
          <div>교차 반응 식품</div>
        </div>
        <Wrapper>
          <ul className="flex gap-6">
            {secondGroup.map((item, index) => {
              if (twoGroup[allergenFoods[Number(item) - 1]] !== undefined) {
                return (
                  <Item key={index} className="flex relative">
                    <div className="bg-[#fff2d8] text-[#ff7f00] rounded-l-[2rem] py-[1rem] px-[1.8rem]">
                      {allergenFoods[Number(item) - 1]}
                    </div>
                    <div className="bg-[#ff7f00] text-white rounded-r-[2rem] py-[1rem] px-[1.8rem]">
                      {twoGroup[allergenFoods[Number(item) - 1]]}
                    </div>
                  </Item>
                );
              }
              return null;
            })}
          </ul>
        </Wrapper>
      </div>
    </div>
  );
};

export default MyGuide;
