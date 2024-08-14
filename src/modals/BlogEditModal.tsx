/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toast } from "react-toastify";
import { resetUpdate, UpdateBlog } from "../redux/blog/blogSlide";

const BlogEditModal = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;
  const disptach = useAppDispatch();
  const isUpdateBlog = useAppSelector((state) => state.blog.isUpdateBlog);
  const [id, setId] = useState();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (dataBlog?.id) {
      setId(dataBlog?.id);
      setTitle(dataBlog?.title);
      setAuthor(dataBlog?.author);
      setContent(dataBlog?.content);
    }
  }, [dataBlog]);

  const handleSubmit = () => {
    if (!title) {
      alert("title empty");
      return;
    }
    if (!content) {
      alert("content empty");
      return;
    }
    if (!author) {
      alert("author empty");
      return;
    }
    console.log(">>> check create blog: ", { title, content, author, id });
    disptach(UpdateBlog({ id, title, content, author }));
  };

  useEffect(() => {
    if (isUpdateBlog === true) {
      setIsOpenUpdateModal(false);
      setTitle("");
      setContent("");
      setAuthor("");
      toast("❤️ Update Blog successfully");
      disptach(resetUpdate());
    }
  }, [isUpdateBlog]);

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
          <Modal.Title>Update A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mb-3">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Content">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
          </FloatingLabel>

          <FloatingLabel label="Author">
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
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

export default BlogEditModal;
