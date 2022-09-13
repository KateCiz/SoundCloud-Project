import { Modal } from '../../context/Modal';
import EditAlbumForm from '../EditAlbumForm';

function EditAlbumFormModal({ album, hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <EditAlbumForm album={album} hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default EditAlbumFormModal;