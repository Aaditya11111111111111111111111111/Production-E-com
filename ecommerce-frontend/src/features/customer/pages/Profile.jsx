import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full mt-1 inline-block capitalize">
              {user?.role}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-400 italic">Full profile editing — coming soon.</p>
      </div>
    </div>
  );
}

export default Profile;
