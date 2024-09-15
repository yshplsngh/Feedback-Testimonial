import Button from './Button';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div
      className={
        'sticky top-0 z-[100] mx-auto items-center justify-between border-b-2 border-zinc-800 bg-zinc-900 bg-opacity-30 bg-clip-padding px-6 py-4 backdrop-blur-sm backdrop-filter md:px-16'
      }
    >
      <div className="flex items-center justify-between border-b px-9 py-2">
        <div className="px-4 py-2 text-xl md:text-3xl">
          <Link to={'/'} className="flex items-center space-x-1">
            <span className="font-bold text-[#fe640b]">Testimonial</span>
            <FileText className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          {/*<Link to={'/'}>*/}
          {/*  <Button variant={'primary'} className="md:block hidden" text={'Pro member'} />*/}
          {/*</Link>*/}
          {/*<Link to={'/'}>*/}
          {/*  <Button variant={'primary'} className="sm md:hidden flex" text={'pro member'} />*/}
          {/*</Link>*/}

          <Link to="/dashboard">
            <Button variant={'primary'} text={'Dashboard'} />
          </Link>
          <Link to="/dashboard">
            <Button variant={'primary'} text={'Login'} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
