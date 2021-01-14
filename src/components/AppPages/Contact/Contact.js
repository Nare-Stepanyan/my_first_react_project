import React from "react";
import styles from "./Contact.module.css";
import { Button, Form } from "react-bootstrap";

class Contact extends React.PureComponent {
  state = {
    formFilled: true,
    name: "",
    email: "",
    message: "",
  };

  checkDatas = () => {
    const { name, email, message } = this.state;
    if (name && email && message) {
      this.setState({
        formFilled: false,
      });
    }
  };
  render() {
    const { formFilled } = this.state;
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>
              Name <span>*</span>
            </Form.Label>
            <Form.Control type="email" placeholder="Input your name" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>
              Email address <span>*</span>
            </Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label className={styles.label}>
              Message <span>*</span>
            </Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="text-center">
            {formFilled ? (
              <Button
                variant="custom"
                type="submit"
                disabled
                className={`${styles.sendButton} bg-gradient-info ${styles.btnCustom}`}>
                Send
              </Button>
            ) : (
              <Button
                variant="custom"
                type="submit"
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
export default Contact;
