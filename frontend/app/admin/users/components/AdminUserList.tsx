"use client";

import { useState } from "react";
import styles from "../../AdminPage.module.css";
import { Pagination } from "../../components/Pagination";

interface User {
  no: number;
  name: string;
  id: string;
  pw: string;
  email: string;
  phone: string;
  birth: string;
  role: string;
}

interface AdminUserListProps {
  users: User[];
  allUsers: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setSearchResult: React.Dispatch<React.SetStateAction<User[]>>;
}

export function AdminUserList({
  users,
  allUsers,
  setUsers,
  setSearchResult,
}: AdminUserListProps) {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [editedRoles, setEditedRoles] = useState<{ [key: number]: string }>({});

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const handleRoleChange = (no: number, newRole: string) => {
    setEditedRoles({
      ...editedRoles,
      [no]: newRole,
    });
  };

  const handleSave = () => {
    const updatedUsers = allUsers.map((user) => {
      if (editedRoles[user.no]) {
        return { ...user, role: editedRoles[user.no] };
      }
      return user;
    });

    setUsers(updatedUsers);
    setSearchResult(updatedUsers); // ✅ 검색 결과도 갱신

    const changedUsers = allUsers.filter((user) => editedRoles[user.no]);

    if (changedUsers.length > 0) {
      const messages = changedUsers
        .map(
          (user) => `${user.name}님이 ${editedRoles[user.no]}로 저장되었습니다.`
        )
        .join("\n");

      alert(messages);
    } else {
      alert("변경사항이 없습니다.");
    }

    setEditedRoles({});
  };

  const paginatedData = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.tableWrapper}>
      {users.length === 0 ? (
        <p className={styles.noResult}>일치하는 정보가 없습니다.</p>
      ) : (
        <>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>NO</th>
                <th>이름</th>
                <th>ID</th>
                <th>PW</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>생년월일</th>
                <th>권한</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.no}>
                  <td>{user.no}</td>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.pw}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.birth}</td>
                  <td>
                    <select
                      value={
                        editedRoles[user.no] !== undefined
                          ? editedRoles[user.no]
                          : user.role
                      }
                      onChange={(e) =>
                        handleRoleChange(user.no, e.target.value)
                      }
                      className={styles.roleSelect}
                    >
                      <option>일반 사용자</option>
                      <option>멘토</option>
                      <option>운영자</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button onClick={handleSave} className={styles.saveButton}>
              저장하기
            </button>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
}
