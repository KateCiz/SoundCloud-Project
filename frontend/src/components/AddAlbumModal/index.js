import { Modal } from '../../context/Modal';
import CreateAlbumForm from '../CreateAlbumForm';

function AddAlbumModal({ hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <CreateAlbumForm hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default AddAlbumModal;