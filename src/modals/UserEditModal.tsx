/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { resetUpdate, UpdateUser } from "../redux/user/userSlide";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";

const UserEditModal = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
  const disptach = useAppDispatch();
  const isUpdateUser = useAppSelector((state) => state.user.isUpdateUser);
  const [id, setId] = useState();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (dataUser?.id) {
      setId(dataUser?.id);
      setEmail(dataUser?.email);
      setName(dataUser?.name);
    }
  }, [dataUser]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    console.log(">>> check update: ", { email, name, id });

    disptach(UpdateUser({ id, email, name }));
  };

  useEffect(() => {
    if (isUpdateUser === true) {
      setIsOpenUpdateModal(false);
      setEmail("");
      setName("");
      toast("❤️ Update user successfully");
      disptach(resetUpdate());
    }
  }, [isUpdateUser]);

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenUpdateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
