import logoImage from "../../assets/logo.png";

export default function Logo({ size = 100 }) {
  return <img 
    src={logoImage} 
    alt="Logo" 
    width={size} 
    height={size}
    className="mx-auto block" 
    />;
}
