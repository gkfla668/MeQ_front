import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { myAllergyPathState } from "@/recoil/states";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import LogoSVG from "public/assets/logo.svg";

const MenuItem = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => (props.active ? "white" : "#ff7f00")};
  background-color: ${props => props.active && "#ff7f00"};
  border-radius: 8rem;

  width: 15rem;
  white-space: nowrap;
  cursor: pointer;
`;

const UserItem = styled.li<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.4rem;
  font-weight: 700;

  width: 12.8rem;
  cursor: pointer;

  color: ${props => props.active && "#ff7f00"};
  background-color: ${props => props.active && "white"};

  border: ${props => props.active && "2px solid #ff7f00;"};
  border-radius: ${props => props.active && "8rem"};
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setMyAllergyPath = useSetRecoilState(myAllergyPathState);
  const router = useRouter();

  const [membersKey, setMembersKey] = useState<string | null>();

  useEffect(() => {
    setMembersKey(() => localStorage.getItem("membersKey"));
  }, [membersKey]);

  const handleOpen = () => {
    if (!membersKey) {
      toast.error("로그인이 필요한 서비스입니다.");
      return router.push("/login");
    }

    if (router.pathname === "/myAllergy") {
      setIsOpen(!isOpen);
    } else {
      setMyAllergyPath(() => "/myAllergy");
      router.push("/myAllergy");
    }
  };

  const handleRouter = (path: string) => {
    if (path !== "" && path !== "login" && path !== "signup" && !membersKey) {
      toast.error("로그인이 필요한 서비스입니다.");
      return router.push("/login");
    }

    setMyAllergyPath(() => "/" + path);
    setIsOpen(false);
    if (path !== "myGuide") router.push(`/${path}`);
  };

  const handleLogout = () => {
    toast.success("로그아웃에 성공했습니다.");
    localStorage.removeItem("membersKey");

    location.reload();
  };

  return (
    <div className="pt-[2.8rem] relative ">
      <div className="flex justify-center items-center ">
        <div
          className="ml-[8rem] mr-[5.2rem] cursor-pointer "
          onClick={() => handleRouter("")}
        >
          <LogoSVG />
        </div>
        <div className="w-full">
          <nav className="flex justify-between items-center bg-[#ffedc8] rounded-l-[8rem] h-[5rem]">
            <ul className="flex h-full">
              <MenuItem
                active={router.pathname === "/"}
                onClick={() => handleRouter("")}
              >
                HOME
              </MenuItem>
              <MenuItem
                active={
                  router.pathname === "/myAllergy" ||
                  router.pathname === "/myGuide"
                }
                onClick={handleOpen}
                className="flex flex-col "
              >
                마이알러지
                {isOpen && (
                  <div className="absolute -bottom-32 text-black border-[#ff7f00] border-[2px] pt-[4rem] w-[15rem] rounded-[1.5rem] flex flex-col justify-center items-center ">
                    <div
                      onClick={() => handleRouter("myAllergy")}
                      className="py-4 text-[#FF7F00] hover:bg-[#F7F7F7] w-full text-center rounded-[1.5rem] bg-white"
                    >
                      마이 알러지
                    </div>
                    <div
                      onClick={() => handleRouter("myGuide")}
                      className="py-4 text-[#FF7F00] hover:bg-[#F7F7F7] w-full text-center rounded-[1.5rem] bg-white"
                    >
                      알러지 가이드
                    </div>
                  </div>
                )}
              </MenuItem>

              <MenuItem
                active={router.pathname === "/myPage"}
                onClick={() => handleRouter("myPage")}
              >
                마이페이지
              </MenuItem>
            </ul>

            <ul className="flex h-full">
              {membersKey ? (
                <UserItem onClick={handleLogout}>로그아웃</UserItem>
              ) : (
                <UserItem
                  active={router.pathname === "/login"}
                  onClick={() => handleRouter("login")}
                >
                  로그인
                </UserItem>
              )}
              {!membersKey && (
                <UserItem
                  active={router.pathname === "/signup"}
                  onClick={() => handleRouter("signup")}
                >
                  회원가입
                </UserItem>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
