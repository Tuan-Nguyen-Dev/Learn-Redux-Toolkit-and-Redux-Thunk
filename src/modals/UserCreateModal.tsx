import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { CreateNewUser, resetCreate } from "../redux/user/userSlide";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const disptach = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const isCreateUser = useAppSelector((state) => state.user.isCreateUser);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    console.log(">>> check create: ", { email, name });

    disptach(CreateNewUser({ email, name }));
  };

  useEffect(() => {
    if (isCreateUser === true) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast("❤️ Create new user successfully");
      disptach(resetCreate());
    }
  }, [isCreateUser]);

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New User</Modal.Title>
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
            onClick={() => setIsOpenCreateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;
