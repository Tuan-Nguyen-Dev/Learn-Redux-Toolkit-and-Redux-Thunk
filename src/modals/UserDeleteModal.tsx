/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { DeleteUser, resetDelete } from "../redux/user/userSlide";
import { toast } from "react-toastify";

const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const disptach = useAppDispatch();
  const isDeleteUser = useAppSelector((state) => state.user.isDeleteUser);

  useEffect(() => {
    if (isDeleteUser === true) {
      setIsOpenDeleteModal(false);
      toast("Delete USer Successfully");
      disptach(resetDelete());
    }
  }, [isDeleteUser]);

  const handleSubmit = () => {
    // console.log(">>> check delete: ", { id: dataUser?.id ?? "" });
    disptach(DeleteUser({ id: dataUser?.id }));
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
