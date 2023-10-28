import { AiFillHome, AiFillMessage, AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { BsFillMusicPlayerFill, BsMusicPlayer } from 'react-icons/bs';
import { HiPlay, HiOutlineShare, HiOutlineUsers, HiOutlinePencilAlt, HiOutlineAdjustments } from 'react-icons/hi';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { RiUser3Fill, RiUser3Line } from 'react-icons/ri';

export const Icons = {
	// Navbar용 아이콘
	home: <AiOutlineHome className="text-4xl" />,
	homeFill: <AiFillHome className="text-4xl m-1 text-primary" />,
	music: <BsMusicPlayer className="text-4xl m-2" />,
	musicFill: <BsFillMusicPlayerFill className="text-4xl m-2 text-primary" />,
	dm: <AiOutlineMessage className="text-4xl m-2" />,
	dmFill: <AiFillMessage className="text-4xl m-2 text-primary" />,
	profile: <RiUser3Line className="text-4xl m-2" />,
	profileFill: <RiUser3Fill className="text-4xl m-2 text-primary" />,
	// 나머지 아이콘들
	playButton: <HiPlay />,
	share: <HiOutlineShare />,
	users: <HiOutlineUsers />,
	modify: <HiOutlinePencilAlt />,
	adjustments: <HiOutlineAdjustments />,
	arrowBack: <IoChevronBack />,
	arrowForward: <IoChevronForward />,
};
