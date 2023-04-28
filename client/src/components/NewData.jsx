import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewData = (props) => {
    let setShowAdd = props.setShowAdd;
    let setDataList = props.setDataList;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        return () => {
            fetch("/api")
                .then((res) => res.json())
                .then((data) => setDataList(data["sqlData"]));
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            name: name,
            email: email,
        };
        fetch("/add", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
            },
        });

        setShowAdd(false);
    };

    document.title = "New Data";
    return (
        <Container className="border border-3 rounded rounded-5 py-3">
            <Form method="POST">
                <Form.Group className="my-1">
                    <Form.Label>Enter name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>Enter email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@organization.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group className="">
                    <Button
                        onClick={handleSubmit}
                        variant="dark"
                        className="d-block mx-auto w-50"
                    >
                        Add data
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};
export default NewData;
