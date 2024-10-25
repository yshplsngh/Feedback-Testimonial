import logoImage from '../../assets/logo.png';

export default function AppLogo({ className }: { className?: string }) {
  return <img src={logoImage} alt="logo" className={className} />;
}
