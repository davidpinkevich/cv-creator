import { useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function ButtonToggle() {
  const [alignment, setAlignment] = useState("ru");
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (alignment !== newAlignment && alignment && newAlignment) {
      setAlignment(newAlignment);
      handleLanguageChange(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton sx={{ width: "80px" }} value="en">
        En
      </ToggleButton>
      <ToggleButton sx={{ width: "80px" }} value="ru">
        Ru
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
