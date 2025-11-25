import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import logo from "../../assets/websiteHeaderImg.png";
import "./NavBarCom.css";
import { Link } from "react-router-dom";
import { UseMovies } from "../../Context/MoviesContext";
import { useNavigate } from "react-router-dom";

export const NavBarCom = () => {
  const { setSearchQuery, searchQuery } = UseMovies();
  const navigate = useNavigate();

  const handelSearch = (e) => {
    setSearchQuery(e.target.value);
    navigate("/allmovies"); // redirect to all page wen try to search
  };

  return (
    <div className="navbarCont">
      <Navbar expand="lg" className="movie-navbar">
        <Container>
          <Link to="/">
            <img
              className="log"
              src={logo}
              alt="Logo"
              style={{ height: "40px" }}
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto search-form">
              <FormControl
                type="search"
                placeholder="Search for a movie..."
                className="me-2 search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handelSearch}
              />
            </Form>

            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/favoriteList"} className="nav-link">
                <i className="fa-solid fa-star"></i> Favorite Filmes
              </Nav.Link>
              <NavDropdown
                title="More"
                id="basic-nav-dropdown"
                className="nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/about"}>
                  <i class="fa-solid fa-layer-group"></i>About Us
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item disabled>
                  <i class="fa-solid fa-right-to-bracket"></i>SIGN IN
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item disabled>
                  <i class="fa-solid fa-user-plus"></i>SIGN UP
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
