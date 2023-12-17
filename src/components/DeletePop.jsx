import { doc, deleteDoc } from "firebase/firestore";
import { tripsRef } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

export const DeletePop = ({ onClose, tripId }) => {
  // created by Nina

  const navigate = useNavigate();

  // deleting the trip itself
  async function handleDelete() {
    const confirmDelete = window.confirm("Do you want to delete this trip?");
    if (confirmDelete) {
      const docRef = doc(tripsRef, tripId);
      await deleteDoc(docRef);
      navigate("/");
    }
  }
  return (
    <div className="popup">
      <p>Do you want to delete this trip?</p>
      <button className="button-white" onClick={onClose}>
        Cancel
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
