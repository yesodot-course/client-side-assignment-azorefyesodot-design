import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Store
        </Typography>

        <div>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={() => navigate("/cart")}>
            Cart
          </Button>

          <Button color="inherit" onClick={() => navigate("/admin")}>
            Admin
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}