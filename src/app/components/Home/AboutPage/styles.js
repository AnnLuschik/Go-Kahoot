import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "0 50px 50px"
  },
  image: {
    width: "inherit",
    borderRadius: "50%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px"
  },
  typography: {
    marginTop: "30px",
    textAlign: "center"
  },
  link: {
    textDecoration: "none"
  }
});

export default useStyles;
