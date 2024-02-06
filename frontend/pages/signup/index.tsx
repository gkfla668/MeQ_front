import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import * as S from "./style";
import { API } from "../api/api";

const SignupPage = () => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [sex, setSex] = useState("");

  const router = useRouter();

  const idRegex = /^(?=.*[a-z])(?=.*[0-9]).{5,20}$/;
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setIdentity(userInput);
  };

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setPassword(userInput);
  };

  const nameRegex = /^[가-힣]{2,5}$/;
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setName(userInput);
  };

  const onSubmit = async () => {
    if (
      identity.length == 0 ||
      password.length == 0 ||
      name.length == 0 ||
      birthYear.length == 0 ||
      birthMonth.length == 0 ||
      birthDay.length == 0
    )
      return;

    const userData = {
      membersId: identity,
      password: password,
      name: name,
      sex: sex,
      birth: birthYear + birthMonth + birthDay,
    };
    try {
      const response = await API.post(
        "/api/v1/members",
        JSON.stringify(userData),
      );

      if (response.status === 200) {
        toast.success("회원가입에 성공하였습니다.");

        router.push("/login");
      } else {
        toast.error("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  const onConfirmId = async () => {
    try {
      const response = await API.get(`/api/v1/members/duplicate/${identity}`);

      if (response.status === 200) {
        if (response.data.responseData) {
          toast.error("중복된 아이디입니다.");
          setIdentity("");
        }
      } else {
        toast.error("중복 확인에 실패하였습니다.");
        console.error("중복확인 실패");
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="w-[52rem] flex flex-col justify-center items-center pt-[1rem]">
      <div className="text-[2.4rem] font-bold mb-[2rem]">회원가입</div>
      <S.Wrapper id="signupForm">
        <div className="flex flex-col items-start gap-[1rem]">
          <div className="flex gap-[1.2rem] item-center justify-center">
            <S.Title>아이디</S.Title>
            <S.Text>
              5 - 20자의 영문 소문자, 숫자를 조합하여 입력해 주세요.
            </S.Text>
          </div>
          <div className="flex gap-4 justify-between items-center w-full">
            <S.Input
              value={identity}
              type="text"
              maxLength={20}
              minLength={5}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeId(e)
              }
              autoFocus
            />
            <button
              onClick={onConfirmId}
              className="whitespace-nowrap border-[1px] rounded-full px-8 py-3 border-[#ff7f00] text-[#ff7f00] hover:text-white hover:bg-[#ff7f00] text-[1.3rem]"
            >
              중복 확인
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[1rem]">
          <div className="flex gap-[1.2rem]">
            <S.Title>비밀번호</S.Title>
            <S.Text>
              8 - 16자의 영문 대/소문자, 숫자를 조합하여 입력해 주세요.
            </S.Text>
          </div>
          <S.Input
            value={password}
            type="password"
            maxLength={20}
            minLength={5}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangePwd(e)
            }
          />
        </div>
        <div className="flex gap-[2rem]">
          <div className="flex flex-col items-start gap-[1rem]">
            <S.Title>이름</S.Title>
            <S.Input
              value={name}
              type="text"
              maxLength={5}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col items-start gap-[1rem]">
            <S.Title>성별</S.Title>
            <div className="flex gap-[0.6rem]">
              <S.RadioInput
                type="radio"
                name="gender"
                value="M"
                id="radio-1"
                onChange={() => setSex("M")}
                checked
              />
              <S.RadioLabel className="text-[1.2rem]" htmlFor="radio-1">
                남성
              </S.RadioLabel>

              <S.RadioInput
                type="radio"
                name="gender"
                value="F"
                id="radio-2"
                onChange={() => setSex("F")}
              />
              <S.RadioLabel className="text-[1.2rem]" htmlFor="radio-2">
                여성
              </S.RadioLabel>

              <S.RadioInput
                type="radio"
                name="gender"
                value="E"
                id="radio-3"
                onChange={() => setSex("E")}
              />
              <S.RadioLabel className="text-[1.2rem]" htmlFor="radio-3">
                기타
              </S.RadioLabel>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[1rem]">
          <S.Title>생년월일</S.Title>
          <div className="flex w-[70%] gap-[1rem]">
            <S.Input
              value={birthYear}
              type="text"
              placeholder="YYYY"
              maxLength={4}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthYear(e.target.value)
              }
            />
            <S.Input
              value={birthMonth}
              type="text"
              placeholder="MM"
              maxLength={2}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthMonth(e.target.value)
              }
            />
            <S.Input
              value={birthDay}
              type="text"
              placeholder="DD"
              maxLength={2}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthDay(e.target.value)
              }
            />
          </div>
        </div>
      </S.Wrapper>
      <S.Button
        type="submit"
        active={
          identity.length !== 0 &&
          password.length !== 0 &&
          name.length !== 0 &&
          birthYear.length !== 0 &&
          birthMonth.length !== 0 &&
          birthDay.length !== 0
        }
        onClick={onSubmit}
      >
        회원가입
      </S.Button>
    </div>
  );
};

export default SignupPage;
