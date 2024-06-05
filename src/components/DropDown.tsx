import { Link, NavLink, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../redux/actions/userActions";
import { AppDispatch, useAppDispatch, useAppSelector } from "../redux/store";
import { setUserNull } from "../redux/reducers/user/userSlice";


interface DropDownProps {
    isOpen: boolean;
    toggleDropDown: () => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DropDown: React.FC<DropDownProps> = ({ isOpen, toggleDropDown, setIsOpen }) => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            console.log('inside handleLogout');

            const response = await dispatch(userLogoutAction())
            console.log(response, 'response');

            if (response.type === "auth/userLogOut/fulfilled") {
                setIsOpen(false)
                navigate('/index')
            }

        } catch (error: any) {
            console.error("Error occurred during logout:", error);
        }
    }

    return (
        <div className="relative w-full" onClick={toggleDropDown}>
            {isOpen && (
                <div className="absolute top-0 right-0 mt-12 w-48 bg-white border border-gray-200 rounded-md shadow-md">
                    {user ?
                        <ul>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                <li onClick={() => navigate('/user/profile')}>
                                    Profile
                                </li>
                            </li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li onClick={handleLogout} className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                        </ul> :
                        <ul>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">About</li>
                        </ul>
                    }

                </div>
            )}
        </div>
    );
};

export default DropDown;