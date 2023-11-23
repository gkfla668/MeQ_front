import { useRouter } from "next/router";
import LogoSVG from "public/assets/logo.svg";
import { styled } from "styled-components";

const MenuItem = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => (props.active ? "white" : "#ff7f00")};
  background-color: ${props => props.active && "#ff7f00"};
  border-radius: 8rem;

  width: 20.8rem;
  white-space: nowrap;
  cursor: pointer;
`;

const UserItem = styled.li<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.6rem;
  font-weight: 700;

  width: 12.8rem;
  cursor: pointer;

  color: ${props => props.active && "#ff7f00"};
  background-color: ${props => props.active && "white"};

  border: ${props => props.active && "2px solid #ff7f00;"};
  border-radius: ${props => props.active && "8rem"};
`;

const Header = () => {
  const router = useRouter();

  return (
    <div className="py-[2.4rem]">
      <div className="flex justify-center items-center">
        <div className="ml-[8rem] mr-[5.2rem]">
          <LogoSVG />
        </div>
        <div className="w-full">
          <nav className="flex justify-between items-center bg-[#ffedc8] rounded-l-[8rem] h-[6rem]">
            <ul className="flex h-full">
              <MenuItem
                active={router.pathname === "/"}
                onClick={() => router.push("/")}
              >
                HOME
              </MenuItem>
              <MenuItem
                active={router.pathname === "/myAllergy"}
                onClick={() => router.push("/myAllergy")}
              >
                마이알러지
              </MenuItem>
              <MenuItem
                active={router.pathname === "/myPage"}
                onClick={() => router.push("/myPage")}
              >
                마이페이지
              </MenuItem>
            </ul>

            <ul className="flex h-full">
              <UserItem
                active={router.pathname === "/login"}
                onClick={() => router.push("/login")}
              >
                로그인
              </UserItem>
              <UserItem
                active={router.pathname === "/register"}
                onClick={() => router.push("/register")}
              >
                회원가입
              </UserItem>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
