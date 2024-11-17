import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <CloseIcon
            onClick={() => {
              setOpenPopup(false);
            }}
          />
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};
Popup.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  content: PropTypes.string,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
};

export default Popup;
