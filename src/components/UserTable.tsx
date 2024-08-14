/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchListUser } from "../redux/user/userSlide";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import UserCreateModal from "../modals/UserCreateModal";
import UserDeleteModal from "../modals/UserDeleteModal";
import UserEditModal from "../modals/UserEditModal";

const UserTable = () => {
  const dispatch = useAppDispatch();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const [dataUser, setDataUser] = useState({});
  const users = useAppSelector((state) => state.user.listUsers);

  useEffect(() => {
    dispatch(fetchListUser());
    // toast("🦄 Wow so easy!");
  }, []);
  const handleEditUser = (user: any) => {
    setDataUser(user);
    setIsOpenUpdateModal(true);
  };
  const handleDelete = (user: any) => {
    setDataUser(user);
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
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
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

      <UserCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />
      <UserDeleteModal
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />

      <UserEditModal
        dataUser={dataUser}
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
      />
    </Container>
  );
};

export default UserTable;
