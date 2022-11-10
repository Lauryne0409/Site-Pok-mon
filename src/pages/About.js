import React from 'react';
import Navigation from '../components/Navigation';
import useModal from "../useModal";
import Modal from "../components/Modal";

const About = () => {
    const { isShowing, toggle } = useModal();
    return (
        <div>
            <Navigation />
            <button className="modal-toggle" onClick={toggle}>
            Show modal
            </button>
            <Modal isShowing={isShowing} hide={toggle} />
        </div>
    );
};

export default About;