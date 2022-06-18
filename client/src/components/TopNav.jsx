import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const TopNav = ({ image }) => {
    return (
        <>
            <Navbar className="border border-dark" variant="dark" bg="dark">
                <Container>
                    <Navbar.Text className="text-light d-flex align-items-center">
                        <h3>Full Stack CRUD Application -</h3>
                        <h5 className="ms-4">
                            Using Mysql, Express js and React js
                        </h5>
                    </Navbar.Text>
                    <Navbar.Text>
                        <span>
                            Made by
                            <a
                                className="text-muted text-reset  ms-1"
                                target="_blank"
                                href="https://github.com/HarshitP147"
                            >
                                Harshit Pandit
                            </a>
                        </span>
                        <span className="ms-4">
                            <a
                                href="https://github.com/HarshitP147/MySQL-ERN-CRUD"
                                target="_blank"
                            >
                                <img
                                    src={image}
                                    title="Link to this repository"
                                    height="25"
                                ></img>
                            </a>
                        </span>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    );
};
export default TopNav;
