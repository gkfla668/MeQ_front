import { selectedSecondGroup } from "@/recoil/states";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { favoriteFoods } from "@/data/FavoriteFoods";
import { useEffect, useState } from "react";

const Label = styled.label`
  white-space: nowrap;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 72px;
  border: 2px solid #ff7f00;
  border-radius: 10rem;
  color: #ff7f00;

  font-size: 1.2rem;
  font-weight: 600;

  padding: 0.8rem 0rem;
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  appearance: none;

  white-space: nowrap;

  color: #ff7f00;
  font-size: 1.2rem;
  font-weight: 500;

  text-align: center;

  cursor: pointer;

  &:hover {
    background-color: #ff7f00;
    color: white;
  }

  &:checked {
    display: inline-block;
    background-color: #ff7f00;
  }

  &:checked + ${Label} {
    background-color: #ff7f00;

    color: white;
  }
`;

interface Props {
  id: string;
  children: string;
}

const FavoriteItem = (props: Props) => {
  const [secondGroup, setSecondGroup] = useRecoilState(selectedSecondGroup);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    return setIsChecked(() =>
      secondGroup.includes((Number(props.id) + 1).toString()),
    );
  }, [secondGroup]);

  const onChangeCheck = () => {
    if (!isChecked) {
      setSecondGroup(prev => [...prev, (Number(props.id) + 1).toString()]);
    } else {
      setSecondGroup(prev =>
        prev.filter(
          (item: string) => item !== (Number(props.id) + 1).toString(),
        ),
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Input
        id={`checkbox-${props.id + 20}`}
        type="checkbox"
        checked={isChecked}
        onChange={onChangeCheck}
      />
      <Label htmlFor={`checkbox-${props.id + 20}`}>
        {favoriteFoods[Number(props.id)]}
      </Label>
    </div>
  );
};

export default FavoriteItem;
