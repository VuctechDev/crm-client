import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "./Breadcrumbs";

interface Props {
  title?: string;
  center?: boolean;
  labels?: { [key: number]: string | undefined };
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const PageWrapper: FC<Props> = ({
  title,
  center,
  labels,
  children,
  actions,
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Box
      // component="main"
      width={1}
      sx={(t) => ({
        flexGrow: 1,
        p: "0px 32px 32px",
        minHeight: "84vh",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        [t.breakpoints.down("sm")]: {
          boxSizing: "border-box",
          p: "20px 10px",
        },
      })}
    >
      <Box
        sx={(t) => ({
          display: "flex",
          alignItems: "flex-start",
          flexGrow: 1,
          maxHeight: "80px",
          [t.breakpoints.down("sm")]: {
            flexDirection: "column",
            rowGap: "14px",
            maxHeight: "fit-content",
            height: "fit-content",
            flexGrow: 0,
          },
        })}
      >
        <Box>
          {title && (
            <Typography variant="h2" mb="12px">
              {t(title)}
            </Typography>
          )}
          <Breadcrumbs aria-label="breadcrumb" labels={labels} />
        </Box>
        <Box
          sx={(t) => ({
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
            columnGap: "28px",
            pl: "36px",
            [t.breakpoints.down("sm")]: {
              flexGrow: 0,
              pl: "0px",
              columnGap: "16px",
            },
          })}
        >
          {actions}
        </Box>
      </Box>
      <Box
        width={1}
        sx={(t) => ({
          flexGrow: 1,
          pt: "50px",
          display: "flex",
          justifyContent: center ? "center" : "unset",
          flexDirection: "column",
          alignItems: center ? "center" : "unset",
          [t.breakpoints.down("sm")]: {
            pt: "20px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          },
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageWrapper;
