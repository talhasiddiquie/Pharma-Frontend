import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeedbackModal = ({ show, setShow, onSubmit }) => {
  const submit = () => {
    onSubmit();
    endMeeting();
  };

  const endMeeting = () => {
    //if (window.confirm('Are you sure to end meeting?')) {
    // window.location.href = '/meeting/logs?id=1';
    //}
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="feedback-title"
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-dialog-scrollable"
    >
      <Modal.Header closeButton>
        <Modal.Title id="feedback-title">Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body className="forms">
        <div className="text-center">
          <Form>
            {/* <Form.Group>
              <Form.Label>
                <h6>Doctor's comfort/friendliness on technolgy and quality of virtual call.</h6>
              </Form.Label>
              <div>
                <Rating
                  emptySymbol={<FontAwesomeIcon size="2x" color="black" icon={faStar} />}
                  fullSymbol={<FontAwesomeIcon size="2x" className="primary-color" icon={faStar} />}
                />
              </div>
            </Form.Group> */}
            <Form.Group>
              <Form.Label>
                <h6>Was doctor convinced on prescribing product as a result of this call ?</h6>
              </Form.Label>
              <Form.Check type="radio" name="convinced" label="Not Clear" />
              <Form.Check type="radio" name="convinced" label="Yes" />
              <Form.Check type="radio" name="convinced" label="No" />
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;
