import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Badge from "@mui/material/Badge";
import {
  Box,
  Chip,
  Grid,
  SpeedDial,
  SpeedDialAction,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const categoryType = [
  {
    value: "Vegan",
    label: "Vegan",
  },
  {
    value: "Vegetarian",
    label: "Vegetarian",
  },
  {
    value: "Non-Vegetarian",
    label: "Non-Vegetarian",
  },
  {
    value: "Eggless",
    label: "Eggless",
  },
  {
    value: "all",
    label: "All",
  },
];

interface Props {
  category: string;
  setCategory: any;
}

export default function CategoryFilter({ category, setCategory }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        height: "100%",

        // width: "100%",
      }}
    >
      <Grid container spacing={2} maxWidth='xl'>
        <Grid
          item
          xs={6}
          xl={6}
          md={6}
          sm={6}
          display={{
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          }}
        >
          <Tooltip
            title={
              <>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  Filter by category
                </Typography>
              </>
            }
            placement='left'
            arrow
          >
            <SpeedDial
              ariaLabel='SpeedDial example'
              sx={{ position: "relative", mt: 1, mb: 1, ml: 10 }}
              icon={<LocalDiningIcon />}
              direction='right'
              FabProps={{
                variant: "extended",

                color: "primary",
                sx: { fontSize: "1rem" },
              }}
            >
              {categoryType.map((action) => (
                <SpeedDialAction
                  key={action.value}
                  FabProps={{ variant: "extended" }}
                  icon={
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {action.label}
                    </Typography>
                  }
                  onClick={() => {
                    if (action.value === "all") {
                      setCategory("");
                    } else {
                      setCategory(`category=${action.value}`);
                    }
                  }}
                />
              ))}
            </SpeedDial>
          </Tooltip>
        </Grid>
        {/* /*<------------------Mobile------------------>*/}

        <Grid
          item
          xs={12}
          xl={0}
          md={0}
          sm={12}
          sx={{
            overflowX: {
              xs: "scroll",
              sm: "scroll",
              md: "hidden",
              lg: "hidden",
              xl: "hidden",
            },
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {categoryType.map((action) => (
            <Chip
              key={action.value}
              label={action.label}
              variant='outlined'
              color='primary'
              sx={{
                m: 1,
                color:
                  category === `category=${action.value}`
                    ? "primary.main"
                    : "secondary.main",
                borderColor:
                  category === `category=${action.value}`
                    ? "primary.main"
                    : " secondary.main",

                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
                // color: "white",
              }}
              onClick={() => {
                if (action.value === "all") {
                  setCategory("");
                  // handleSelected(action.value);
                } else {
                  setCategory(`category=${action.value}`);
                }
              }}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
function setFilter(arg0: string) {
  throw new Error("Function not implemented.");
}

function setClearFilter(arg0: boolean) {
  throw new Error("Function not implemented.");
}
