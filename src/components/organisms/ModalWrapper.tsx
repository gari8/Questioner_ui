import {FC} from "react";
import {DisclosureInterface} from "../../types";
import {ModalType} from "../../utilities/items";
import ProfileModal from "./ProfileModal";
import LogoutModal from "./LogoutModal";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import NewQuestionModal from "./NewQuestionModal";

interface Props {
	modalType: ModalType
	disclosure: DisclosureInterface
}

const ModalWrapper: FC<Props> = ({ modalType, disclosure }) => {
	switch (modalType) {
		case ModalType.NewQuestion:
			return <NewQuestionModal disclosure={disclosure} />
		case ModalType.Profile:
			return <ProfileModal disclosure={disclosure}/>
		case ModalType.Logout:
			return <LogoutModal disclosure={disclosure} />
		case ModalType.Login:
			return <LoginModal disclosure={disclosure} />
		case ModalType.Signup:
			return <SignupModal disclosure={disclosure} />
		default:
			return <></>
	}
}

export default ModalWrapper;