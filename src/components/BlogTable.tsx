/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { fetchListBlog } from "../redux/blog/blogSlide";
import BlogCreateModel from "../modals/BlogCreateModel";
import BlogDeleteModal from "../modals/BlogDeleteModal";
import BlogEditModal from "../modals/BlogEditModal";

const BlogTable = () => {
  const dispatch = useAppDispatch();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const [dataBlog, setDataBlog] = useState({});
  const blog = useAppSelector((state) => state.blog.listBlog);

  useEffect(() => {
    dispatch(fetchListBlog());
    // toast("🦄 Wow so easy!");
  }, []);
  const handleEditUser = (blog: any) => {
    setDataBlog(blog);
    setIsOpenUpdateModal(true);
  };
  const handleDelete = (blog: any) => {
    setDataBlog(blog);
    setIsOpenDeleteModal(true);
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h4>Table User</h4>
        <Button
          onClick={() => setIsOpenCreateModal(true)}
          className="btn-primary"
        >
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blog.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>

                <td>{item.author}</td>
                <td>
                  <Button variant="danger" onClick={() => handleEditUser(item)}>
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="warning" onClick={() => handleDelete(item)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <BlogCreateModel
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />
      <BlogDeleteModal
        dataBlog={dataBlog}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />

      <BlogEditModal
        dataBlog={dataBlog}
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      />
    </Container>
  );
};

export default BlogTable;
