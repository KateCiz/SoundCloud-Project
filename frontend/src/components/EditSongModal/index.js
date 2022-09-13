import React from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from '../EditSongForm';

function EditSongFormModal({ song, hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <EditSongForm song={song} hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongFormModal;