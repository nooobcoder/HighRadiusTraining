import abc_company_logo from "../assets/abc_logo.png";
import highradius_logo from "../assets/highradius_logo.png";

const Header = () => (
	<div className="flex  justify-between px-5 py-3 ">
		<img
			alt="left_company_logo"
			src={abc_company_logo}
			className="hover:shadow-md h-12"
		/>
		<img
			alt="left_company_logo"
			src={highradius_logo}
			className="hover:shadow-md h-12"
		/>

		<div>2</div>
	</div>
);
export default Header;
