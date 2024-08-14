import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import Form from "react-bootstrap/Form";
import { changeMode } from "../redux/app/appSlide";
const Header = () => {
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("data-bs-theme", mode);
    }
  }, [mode]);
  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Learn Redux</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check // prettier-ignore
            defaultChecked={mode === "light" ? false : true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                changeMode(e.target.checked === true ? "dark" : "light")
              );
            }}
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
