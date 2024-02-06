import styled from "styled-components";
import AllergenItem from "./AllergenItem";
import { allergenFoods } from "@/data/AllergenFoods";
import { favoriteFoods } from "@/data/FavoriteFoods";
import FavoriteItem from "./FavoriteItem";

import { API } from "@/pages/api/api";
import { useRecoilState } from "recoil";
import { selectedFirstGroup, selectedSecondGroup } from "@/recoil/states";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Wrapper = styled.div`
  border-radius: 2rem;
  border: 2px solid #f7f7f7;

  background: rgba(255, 255, 255, 0.8);

  box-shadow: 5px 10px 20px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  padding: 2rem;
`;

const Button = styled.button`
  width: 20%;
  border-radius: 8rem;
  padding: 1.2rem 0;
  font-size: 1.4rem;

  color: white;
  background-color: #ff7f00;

  &:hover {
    background-color: #ffd37b;
  }
`;

const MyAllergy = () => {
  const [checkedAllergies, setCheckedAllergies] =
    useRecoilState(selectedFirstGroup);
  const [checkedFoods, setCheckedFoods] = useRecoilState(selectedSecondGroup);

  const [isFirstSubmitted, setIsFirstSubmitted] = useState(false);
  const [isSecondSubmitted, setIsSecondSubmitted] = useState(false);

  const membersKey = localStorage.getItem("membersKey");

  useEffect(() => {
    /**  알레르기 유발 식품 조회 API */
    API.get(`/api/v1/members-allergies/${membersKey}`)
      .then(res => {
        console.log(
          "알레르기 유발 식품 조회!",
          res.data.responseData.allergiesIds,
        );
        if (Object.keys(res.data.responseData.allergiesIds).length >= 1) {
          setCheckedAllergies(res.data.responseData.allergiesIds);
          setIsFirstSubmitted(true);
        }
      })
      .catch(err => {
        console.error(err);
      });

    /**  선호 식품 조회 API */
    API.get(`/api/v1/members-foods/${membersKey}`)
      .then(res => {
        console.log("선호 식품 조회!", res.data.responseData.foodsIds);
        if (Object.keys(res.data.responseData.foodsIds).length >= 1) {
          setCheckedFoods(res.data.responseData.foodsIds);
          setIsSecondSubmitted(true);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [isFirstSubmitted, isSecondSubmitted]);

  /** 알레르기 유발 식품 등록 API */
  const onSubmitAllergies = async () => {
    const allergyData = {
      membersKey: membersKey,
      allergiesIds: [...checkedAllergies].sort((a, b) => Number(a) - Number(b)),
    };

    try {
      const response = await API.post(
        "/api/v1/members-allergies",
        JSON.stringify(allergyData),
      );
      if (response.status === 200) {
        toast.success("알레르기 유발식품 등록에 성공하였습니다.");
        console.log(
          "알레르기 유발식품 등록 성공",
          response.data.responseData.allergiesIds,
        );
        location.reload();
      } else {
        toast.error("알레르기 유발식품 등록에 실패하였습니다.");
        console.error("알레르기 유발식품 등록 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  /** 알레르기 유발 식품 수정 API */
  const onEditAllergies = async () => {
    const allergyData = {
      membersKey: membersKey,
      allergiesIds: [...checkedAllergies].sort((a, b) => Number(a) - Number(b)),
    };

    try {
      const response = await API.put(
        "/api/v1/members-allergies",
        JSON.stringify(allergyData),
      );
      if (response.status === 200) {
        toast.success("알레르기 유발식품 수정에 성공하였습니다.");
        console.log(
          "알레르기 유발식품 수정 성공",
          response.data.responseData.allergiesIds,
        );
      } else {
        toast.error("알레르기 유발식품 수정에 실패하였습니다.");
        console.error("알레르기 유발식품 수정 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  /** 선호 식품 등록 API */
  const onSubmitFoods = async () => {
    const foodData = {
      membersKey: membersKey,
      foodsIds: [...checkedFoods].sort((a, b) => Number(a) - Number(b)),
    };

    try {
      const response = await API.post(
        "/api/v1/members-foods",
        JSON.stringify(foodData),
      );
      if (response.status === 200) {
        toast.success("선호 식품 등록에 성공하였습니다.");
        console.log("선호 식품 등록 성공", response.data.responseData.foodsIds);
        location.reload();
      } else {
        toast.error("선호 식품 등록에 실패하였습니다.");
        console.error("선호 식품 등록 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  /** 선호 식품 수정  API */
  const onEditFoods = async () => {
    const foodData = {
      membersKey: membersKey,
      foodsIds: [...checkedFoods].sort((a, b) => Number(a) - Number(b)),
    };

    try {
      const response = await API.put(
        "/api/v1/members-foods",
        JSON.stringify(foodData),
      );
      if (response.status === 200) {
        toast.success("선호 식품 수정에 성공하였습니다.");
        console.log("선호 식품 수정 성공", response.data.responseData.foodsIds);
      } else {
        toast.error("선호 식품 수정에 실패하였습니다.");
        console.error("선호 식품 수정 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col gap-12 mt-12">
      <div className="flex flex-col gap-8 justify-center items-center border-b-[1px] border-[#f0f0f0] pb-12">
        <div className="font-bold text-[1.6rem] flex justify-center items-center">
          알레르기 유발 식품 선택
        </div>
        <Wrapper>
          <div className="flex gap-6">
            {allergenFoods.map((item, index) => {
              return (
                index <= 6 && (
                  <AllergenItem id={index.toString()}>{item}</AllergenItem>
                )
              );
            })}
          </div>
          <div className="flex gap-6">
            {allergenFoods.map((item, index) => {
              return (
                index >= 7 &&
                index <= 13 && (
                  <AllergenItem id={index.toString()}>{item}</AllergenItem>
                )
              );
            })}
          </div>
          <div className="flex gap-6">
            {allergenFoods.map((item, index) => {
              return (
                index >= 14 &&
                index <= 20 && (
                  <AllergenItem id={index.toString()}>{item}</AllergenItem>
                )
              );
            })}
          </div>
        </Wrapper>
        {isFirstSubmitted ? (
          <Button onClick={onEditAllergies}>수정</Button>
        ) : (
          <Button onClick={onSubmitAllergies}>등록</Button>
        )}
      </div>
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="font-bold text-[1.6rem] flex justify-center items-center">
          선호 식품 선택
        </div>
        <Wrapper>
          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index > 6) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>
          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index < 7 || index > 13) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>
          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index < 14 || index > 20) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>
          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index < 21 || index > 27) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>
          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index < 28 || index > 34) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>

          <div className="flex gap-6">
            {favoriteFoods.map((item, index) => {
              if (index < 35 || index > 41) return;
              return <FavoriteItem id={index.toString()}>{item}</FavoriteItem>;
            })}
          </div>
        </Wrapper>
        {isSecondSubmitted ? (
          <Button onClick={onEditFoods}>수정</Button>
        ) : (
          <Button onClick={onSubmitFoods}>등록</Button>
        )}
      </div>
    </div>
  );
};

export default MyAllergy;
