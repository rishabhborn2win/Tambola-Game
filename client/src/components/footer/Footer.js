import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="mainfooter" role="contentinfo">
      <div class="footer-middle">
        <div class="container">
          <div class="column">
            <div>
              <h4>Follow Us</h4>
              <ul class="social-network social-circle">
                <li>
                  <a
                    href="https://www.facebook.com/rishabhborn2win"
                    class="icoFacebook"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/rishabh-mishra-4b647b167/"
                    class="icoLinkedin"
                    title="Linkedin"
                  >
                    <i class="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-12 copy">
              <p class="text-center">
                &copy; Designed By <b> RISHABH MISHRA</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
