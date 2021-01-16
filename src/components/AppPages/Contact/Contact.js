import React from "react";
import styles from "./Contact.module.css";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { sendFormMessage } from "../../../store/actions";

class Contact extends React.PureComponent {
  state = {
    formFilled: true,
    name: "",
    email: "",
    message: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      this.checkDatas()
    );
  };

  checkDatas = () => {
    const { name, email, message } = this.state;
    if (name && email && message) {
      this.setState({
        formFilled: false,
      });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const { sendFormMessage } = this.props;
    if (!name || !email || !message) {
      this.setState({
        formFilled: true,
      });
      return;
    }
    const formMessage = {
      name,
      email,
      message,
    };
    this.setState({
      name: "",
      email: "",
      message: "",
    });
    sendFormMessage(formMessage);
  };

  render() {
    const { formFilled, name, email, message } = this.state;
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>
              Name <span>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Input your name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>
              Email address <span>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className={styles.label}>
              Message <span>*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={message}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="text-center">
            {formFilled ? (
              <Button
                variant="custom"
                disabled
                className={`${styles.sendButton} bg-gradient-info ${styles.btnCustom}`}>
                Send
              </Button>
            ) : (
              <Button
                variant="custom"
                type="submit"
                onClick={this.handleClick}
                className={`${styles.sendButtonActive} bg-gradient-info ${styles.btnCustom}`}>
                Send
              </Button>
            )}
          </Form.Group>
        </Form>
      </>
    );
  }
}
const mapDispatchToProps = {
  sendFormMessage,
};
export default connect(null, mapDispatchToProps)(Contact);
