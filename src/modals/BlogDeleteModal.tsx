/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { resetDelete } from "../redux/blog/blogSlide";
import { toast } from "react-toastify";
import { DeleteBlog } from "../redux/blog/blogSlide";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const isDeleteBlog = useAppSelector((state) => state.blog.isDeleteBlog);
  const disptach = useAppDispatch();

  console.log("check data", dataBlog);

  useEffect(() => {
    if (isDeleteBlog === true) {
      setIsOpenDeleteModal(false);
      toast("Delete Blog Successfully");
      disptach(resetDelete());
    }
  }, [isDeleteBlog]);

  const handleSubmit = () => {
    // console.log(">>> check delete: ", { id: dataUser?.id ?? "" });
    disptach(DeleteBlog({ id: dataBlog.id }));
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
        <Modal.Title>Delete A Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the Blog: {dataBlog?.title ?? ""}</Modal.Body>
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

export default BlogDeleteModal;
