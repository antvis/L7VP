import style from './index.less';
import { SITE_LOGO } from '@/constants';

type LogoProps = {
  onClick?: () => void;
};

const Logo = (props: LogoProps) => {
  return (
    <div className={style.logo} onClick={props?.onClick}>
      <img src={SITE_LOGO} />
    </div>
  );
};

export default Logo;
