import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalComponent({
  header, buttonLabel, submitButton, declineButton, body,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => { return setShow(false); };
  const handleShow = () => { return setShow(true); };

  return (
    <div>
      <a variant="primary" onClick={handleShow}>
        {buttonLabel}
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {submitButton ? (
            <Button variant="primary" onClick={handleClose}>
              {submitButton}
            </Button>
          ) : null}
          { declineButton ? (
            <Button variant="primary" onClick={handleClose}>
              { declineButton}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
