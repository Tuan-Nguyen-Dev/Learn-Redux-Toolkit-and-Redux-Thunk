import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { resetCreate } from "../redux/user/userSlide";
import { toast } from "react-toastify";
import { CreateNewBlog } from "../redux/blog/blogSlide";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BlogCreateModel = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;
  const disptach = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const isCreateBlog = useAppSelector((state) => state.blog.isCreateBlog);

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
    console.log(">>> check create blog: ", { title, content, author });
    disptach(CreateNewBlog({ title, content, author }));
  };

  useEffect(() => {
    if (isCreateBlog === true) {
      setIsOpenCreateModal(false);
      setTitle("");
      setContent("");
      setAuthor("");
      toast("❤️ Create new blog successfully");
      disptach(resetCreate());
    }
  }, [isCreateBlog]);

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
          <Modal.Title>Add A New Blog</Modal.Title>
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

export default BlogCreateModel;
