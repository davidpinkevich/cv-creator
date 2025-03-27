import { List, ListItem, Typography } from "@mui/material";

import { type ListItemsTypes } from "./types";

export function ListItems({ items, type }: ListItemsTypes) {
  console.log(items, type);
  return (
    <List sx={{ padding: 0 }}>
      {items &&
        items
          .replace(type === "skills" ? /•/g : /[•·]/g, "")
          .split(type === "skills" ? /\s*·\s*|\n\s*/ : /[.;]/)
          .filter((item) => item.length)
          .map((item) => (
            <ListItem
              key={item}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                padding: "0 0 0 12px",
                position: "relative",
                "&::before": {
                  content: "''",
                  borderRadius: "50%",
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#8A9090",
                  fontWeight: "bold",
                  fontSize: "14px",
                  position: "absolute",
                  left: 0,
                  top: "6px",
                },
              }}
            >
              <Typography
                color="#8A9090"
                fontFamily="Calibri"
                fontSize={11}
                sx={{ textAlign: "justify" }}
              >
                {type === "skills" && item}
                {type === "achievements" && item && item + ";"}
              </Typography>
            </ListItem>
          ))}
    </List>
  );
}
