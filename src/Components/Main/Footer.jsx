import React from "react";
import Container from "@mui/material/Container";

function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <Container>
                <p>Copyright &copy; {year}</p>
            </Container>
        </footer>
    );
}

export default Footer;