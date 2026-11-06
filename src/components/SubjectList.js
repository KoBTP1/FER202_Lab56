import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Subject() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get("http://localhost:9000/subjects");

      setSubjects(response.data);
    };

    fetchSubjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const filteredSubjects = subjects.filter((subject) => {
    const name = String(subject.name || "")
      .trim()
      .toLowerCase();

    const id = String(subject.id || "").toLowerCase();
    const keyword = search.trim().toLowerCase();
    const matchesName = name.startsWith(keyword);
    const mathcesId = id.includes(keyword)

    return matchesName || mathcesId;
  });


  return (
    <Container className="g-3">
      <Row>
        <h4 className="border ">
            Hello {user?.email} ({user?.role})
          </h4>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Danh sách môn học</h3>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Tìm kiếm môn học..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table
          striped
          bordered
          hover
          responsive
          className="mt-3"
          style={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              <th>Mã môn</th>
              <th>Tên môn học</th>
              <th>Số lượng câu hỏi</th>
              <th>Tools</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubjects.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.questionsCount}</td>
                <td className="d-flex justify-content-between">
                  <Link
                    to={`/question/${item.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Truy cập bộ câu hỏi
                  </Link>

                  <Link className="btn btn-secondary btn-sm">Thông tin</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
