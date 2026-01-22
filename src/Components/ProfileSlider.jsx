import '../Style/Navbar.css'
function ProfileSidebar({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end mt-5 outerProfile" >
      <div className="bg-black w-80 h-full p-6 shadow-lg transform transition-transform duration-300 mt-4 profileSlider">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {user ? (
            <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
          </div>
        ) : (
            <p>No user info</p>
        )}
        <button className="d-flex font-bold px-4 hover:text-danger" onClick={onClose}>X Close </button>
      </div>
    </div>
  )
}

export default ProfileSidebar
