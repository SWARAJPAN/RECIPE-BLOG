import AvTimerIcon from "@mui/icons-material/AvTimer";
import {
  Box,
  Chip,
  Grid,
  SpeedDial,
  SpeedDialAction,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const cookingTime = [
  { value: "15mins", label: "15mins" },
  {
    value: "30mins",
    label: "30mins",
  },
  { value: "45mins", label: "45mins" },
  { value: "1hr", label: "1hr+" },
  { value: "2hr", label: "2hr+" },
  {
    value: "all",
    label: "All",
  },
];

interface Props {
  filter: string;
  setFilter: any;
}

export default function TimeFilter({ filter, setFilter }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Grid container spacing={2} maxWidth='md'>
        <Grid
          item
          xs={12}
          xl={6}
          md={6}
          sm={6}
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
        >
          <Tooltip
            title={
              <>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  Filter by cooking time
                </Typography>
              </>
            }
            placement='left'
            arrow
          >
            <SpeedDial
              ariaLabel='SpeedDial example'
              sx={{ position: "relative", mt: 1, mb: 1, marginRight: "auto" }}
              icon={<AvTimerIcon />}
              direction='right'
              FabProps={{
                variant: "extended",

                color: "primary",
                sx: { fontSize: "1rem" },
              }}
            >
              {cookingTime.map((action) => (
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
                      setFilter("");
                    } else {
                      setFilter(`cookTime=${action.value}`);
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
          xl={6}
          md={6}
          sm={6}
          display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
        >
          {cookingTime.map((action) => (
            <Chip
              key={action.value}
              label={action.label}
              variant='outlined'
              color='primary'
              sx={{
                m: 1,
                color:
                  filter === `cookTime=${action.value}`
                    ? "primary.main"
                    : "secondary.main",
                borderColor:
                  filter === `cookTime=${action.value}`
                    ? "primary.main"
                    : " secondary.main",
                // color: "white",
              }}
              onClick={() => {
                if (action.value === "all") {
                  setFilter("");
                  // handleSelected(action.value);
                } else {
                  setFilter(`cookTime=${action.value}`);
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
