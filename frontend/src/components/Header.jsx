import { AppBar, Paper, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
const Header = (props) => {
  const { title, subTitle, icon } = props;
  return (
    <div>
      <AppBar position="static">
        <Paper
          elevation={2}
          square
          sx={{
            display: "flex",
            backgroundColor: "#5869FC",
            paddingX: 2,
            paddingY: 1,
            color: "white",
          }}
        >
          <Card
            sx={{
              marginX: 2,
              color: "#3c44b1",
              display: "inline-block",
              padding: 2,
              borderRadius: 2,
            }}
          >
            {icon}
          </Card>
          <div>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "700", fontFamily: "inherit" }}
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle"
              component="div"
              sx={{ opacity: 0.7, fontStyle: "italic" }}
            >
              {subTitle}
            </Typography>
          </div>
        </Paper>
      </AppBar>
    </div>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.object,
};
export default Header;
