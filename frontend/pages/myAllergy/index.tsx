import { myAllergyPathState } from "@/recoil/states";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

import MyAllergy from "@/components/MyAllergy";
import MyGuide from "@/components/MyGuide";

const MyAllergyPage = () => {
  const [path, setPath] = useRecoilState(myAllergyPathState);
  const [dashboard, setDashboard] = useState<React.ReactNode>();

  useEffect(() => {
    if (path === "/myAllergy") {
      setDashboard(<MyAllergy />);
    } else {
      setDashboard(<MyGuide />);
    }
  }, [path]);

  return <div className="w-[68rem]">{dashboard}</div>;
};

export default MyAllergyPage;
