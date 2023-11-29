import { useRouter } from "next/router";
import IconLogoSVG from "public/assets/iconLogo.svg";
import TextLogoSVG from "public/assets/textLogo.svg";
import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1.6rem 3.2rem;
  border-radius: 8rem;
  border: 2px solid #423227;

  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1) inset;

  &::placeholder {
    font-size: 1.4rem;
  }

  &:focus {
    outline: none;
    border: 2px solid #ff7f00;
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 8rem;
  padding: 1.6rem 0;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  background-color: #ff7f00;

  &:hover {
    background-color: #ffd37b;
  }
`;

const Login = () => {
  const router = useRouter();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  /** Login API */
  const onSubmit = () => {
    console.log(id, pwd);

    // router.push("/");
  };

  return (
    <div className="w-[32rem] pt-[1rem]">
      <div className="flex flex-col justify-center items-center">
        <IconLogoSVG />
        <TextLogoSVG />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col gap-[1.2rem] w-full my-[4rem]">
          <Input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <Button onClick={onSubmit}>로그인</Button>
          <div className="flex justify-center items-center gap-[1.2rem]">
            <p className="text-[1.4rem] text-[#423227]">
              아직 회원이 아니신가요?
            </p>
            <button
              onClick={() => router.push("/register")}
              className="text-[1.6rem] text-[#FF7F00] font-bold "
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
