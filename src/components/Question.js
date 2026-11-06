import { useEffect, useState } from "react";
import {Button, Container, Row, Table} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Question() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectResponse = await axios.get(
          `http://localhost:9000/subjects/${id}`
        );

        setSubject(subjectResponse.data);

        const questionResponse = await axios.get(
          `http://localhost:9000/questions?subjectId=${id}`
        );

        setQuestions(questionResponse.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate("/subjects");
  };

  return (
    <Container className="mt-4">
      <Row>
        <div className="mb-3">
          <h2>
            {subject.name} ({subject.id})
          </h2>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>
            Total Questions: {questions.length}
          </h5>

          <div className="d-flex gap-2">
            <Button variant="success">
              Add Question
            </Button>

            <Button variant="primary" onClick={handleBack}>
              Back to Subject List
            </Button>
          </div>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nội dung câu hỏi</th>
              <th>Các đáp án</th>
              <th>Đáp án đúng</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.content}</td>
                <td>
                  {item.options?.join(", ")}
                </td>
                <td>{item.correctAnswer}</td>
                <td>
                    <Button className="btn btn-warning">Sửa</Button>
                    <Button className="btn btn-danger">Sửa</Button>
                </td>
              </tr>
            ))}

            {questions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No questions found!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
